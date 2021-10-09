use nalgebra::SMatrix;
use nalgebra::SVector;
use std::convert::TryInto;
use wasm_bindgen::prelude::*;

const SIZE_X: usize = 20;
const SIZE_Y: usize = 20;
const FLAT_SIZE: usize = SIZE_X * SIZE_Y;

#[wasm_bindgen]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum Cell {
    Wall = 0,
    Pass = 1,
    Entrance = 2,
    Treasury = 3,
    Subtreasury = 4,
}
#[derive(Copy, Clone)]
enum Direction {
    North = 0,
    East = 1,
    South = 2,
    West = 3,
}

impl From<Direction> for usize {
    fn from(dir: Direction) -> Self {
        match dir {
            Direction::North => 0,
            Direction::East => 1,
            Direction::South => 2,
            Direction::West => 3,
        }
    }
}

/// Cell neighbourhood with respect to movement direction
///
/// - `Wall`: it is walled of or wall iself - no movement possible
/// - `Free`: all movement directions possible
/// - `Sac`: dead-end
/// - `Rhs`: wall to the right
/// - `Leftturn`: wall to the right and ahead
/// - `Rightturn`: wall to the left and ahead
/// - `Crossroads`: wall ahead
/// - `Exit`: will exit
enum Locality {
    Wall,
    Free,
    Sac,
    Rhs,
    Lhs,
    Leftturn,
    Rightturn,
    Crossroads,
    Exit,
}

pub type CellField = [Cell; FLAT_SIZE];
pub type VisitedField = [f64; FLAT_SIZE];
type MoverField = SMatrix<f64, 4, FLAT_SIZE>;
type DirVec = SVector<f64, 4>;
type DirIndexVec = [usize; 4];

/// Game field
#[wasm_bindgen]
pub struct Subway {
    field: CellField,
    visited: VisitedField,
    movers: MoverField,
}

#[wasm_bindgen]
impl Subway {
    pub fn new() -> Self {
        Subway {
            field: [Cell::Wall; FLAT_SIZE],
            visited: [0.; FLAT_SIZE],
            movers: SMatrix::zeros(),
        }
    }

    /// Set cell type
    pub fn set_field(&mut self, idx: usize, cell: Cell) {
        self.field[idx] = cell;
    }
    /// Get cell type
    pub fn get_field(&self, idx: usize) -> Cell {
        self.field[idx]
    }
    /// Get probability for a cell
    pub fn get_visited_probability(&self, idx: usize) -> f64 {
        self.visited[idx]
    }

    /// Get cell-local configuration (with move dynamics)
    fn _get_locality(
        &self,
        idx: usize,
        in_direction: Direction,
        move_count: u32,
    ) -> (Locality, DirIndexVec, DirVec) {
        if self.field[idx] == Cell::Wall {
            return (Locality::Wall, [idx; 4], DirVec::zeros());
        } else if self.field[idx] == Cell::Entrance && move_count >= 20 {
            return (Locality::Exit, [idx; 4], DirVec::zeros());
        } else if self.field[idx] == Cell::Treasury || self.field[idx] == Cell::Subtreasury {
            return (Locality::Exit, [idx; 4], DirVec::zeros());
        }
        // cell indices for relative directions
        let indices = [
            idx + SIZE_X, // when going from north, next north cell is here
            idx - 1,
            idx - SIZE_X,
            idx + 1,
            idx + SIZE_X, // cycle
            idx - 1,
            idx - SIZE_X,
        ];
        let offsets: DirIndexVec = indices[in_direction as usize..in_direction as usize + 4]
            .try_into()
            .unwrap();
        let walls = [
            self.field[offsets[0]] == Cell::Wall,
            self.field[offsets[1]] == Cell::Wall,
            self.field[offsets[2]] == Cell::Wall,
            self.field[offsets[3]] == Cell::Wall,
        ];
        if move_count == 0 && self.field[idx] == Cell::Entrance {
            // when initializing, movement at entrance is equally random
            let num_freeways = walls.iter().filter(|&&x| !x).count();
            let prob = 1.0 / num_freeways as f64;
            let mut probs = DirVec::zeros();
            for i in 0..4 {
                probs[i] = if walls[i] { 0. } else { prob }
            }
            return (Locality::Free, [idx; 4], probs);
        }
        match walls {
            [true, true, true, true] => (Locality::Wall, offsets, DirVec::zeros()),
            [true, true, true, false] => (Locality::Sac, offsets, DirVec::from([0., 0., 0., 1.])),
            [true, true, false, true] => (Locality::Sac, offsets, DirVec::from([0., 0., 1., 0.])),
            [true, false, true, true] => (Locality::Sac, offsets, DirVec::from([0., 1., 0., 0.])),
            [false, true, true, true] => (Locality::Sac, offsets, DirVec::from([1., 0., 0., 0.])),
            [true, true, _, false] => (Locality::Leftturn, offsets, DirVec::from([0., 0., 0., 1.])),
            [true, false, _, true] => (
                Locality::Rightturn,
                offsets,
                DirVec::from([0., 0.8, 0.2, 0.]),
            ),
            [true, false, _, false] => (
                Locality::Crossroads,
                offsets,
                DirVec::from([0., 0.8, 0., 0.2]),
            ),
            [false, true, _, _] => (Locality::Rhs, offsets, DirVec::from([1., 0., 0., 0.])),
            [false, false, _, true] => (Locality::Lhs, offsets, DirVec::from([0.85, 0.15, 0., 0.])),
            [false, false, false, false] => {
                (Locality::Free, offsets, DirVec::from([0.85, 0.15, 0., 0.]))
            }
            [false, false, true, false] => (Locality::Wall, offsets, DirVec::zeros()),
        }
    }

    /// Initialize probability matrix for first step
    pub fn init(&mut self) {
        self.visited = [0.; FLAT_SIZE];
        self.movers = SMatrix::zeros();
        for idx in 0..FLAT_SIZE {
            let x = idx % SIZE_X;
            let y = idx % SIZE_Y;
            // Guard rails
            if x == 0 || x == SIZE_X - 1 || y == 0 || y == SIZE_Y - 1 {
                continue;
            }

            // Set entry point probability
            if self.field[idx] == Cell::Entrance {
                self.visited[idx] = 1.0;
                let (_, _, move_probs) = self._get_locality(idx, Direction::South, 0);
                self.movers.set_column(idx, &move_probs);
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;

    impl std::fmt::Debug for Cell {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> Result<(), std::fmt::Error> {
            match *self {
                Cell::Wall => f.write_str("[#]"),
                Cell::Pass => f.write_str("[ ]"),
                Cell::Treasury => f.write_str("[💰]"),
                Cell::Subtreasury => f.write_str("[📦]"),
                Cell::Entrance => f.write_str("[🚪]"),
            }
        }
    }

    #[wasm_bindgen_test]
    fn test_freeway() {
        let mut subway = Subway::new();
        subway.set_field(128, Cell::Entrance);
        subway.set_field(127, Cell::Pass);
        subway.set_field(126, Cell::Treasury);

        subway.init();

        assert_eq!(subway.get_field(128), Cell::Entrance);

        // mover configuration: only one pointing to the west
        let entrance_m = subway.movers.column(128);
        let mut iter_m = entrance_m.iter();
        assert_eq!(*iter_m.next().unwrap(), 0.);
        assert_eq!(*iter_m.next().unwrap(), 0.);
        assert_eq!(*iter_m.next().unwrap(), 0.);
        assert_eq!(*iter_m.next().unwrap(), 1.);
        assert!(iter_m.next().is_none());
    }
}
