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

#[derive(Copy, Clone, PartialEq, Eq)]
enum Direction {
    North = 0,
    East = 1,
    South = 2,
    West = 3,
}

impl Direction {
    pub fn opposite(self) -> Self {
        match self {
            Direction::North => Direction::South,
            Direction::East => Direction::West,
            Direction::South => Direction::North,
            Direction::West => Direction::East,
        }
    }
}

impl std::ops::Add for Direction {
    type Output = Self;
    fn add(self, rhs: Self) -> Self::Output {
        match (self as usize + rhs as usize) % 4 {
            1 => Direction::East,
            2 => Direction::South,
            3 => Direction::West,
            _ => Direction::North,
        }
    }
}

/// CellField: subway field, linearized
pub type CellField = [Cell; FLAT_SIZE];

/// VisitedField: calculated visiting probabilities
pub type VisitedField = SVector<f64, FLAT_SIZE>;

/// MoverField: "part" of initial group, 4 directions, upon entering a cell
type MoverField = SMatrix<f64, 4, FLAT_SIZE>;

/// DirVec: movement probability, 4 directions
type DirVec = SVector<f64, 4>;

/// DirIndexVec: cell index, 4 directions
type DirIndexVec = [usize; 4];

/// Game field
#[wasm_bindgen]
pub struct Subway {
    /// game field
    field: CellField,

    /// accumulated probabilities of visiting a cell
    visited: VisitedField,

    /// movers after last calculated step
    ///
    /// Entry point has initially 100% of the group and it creates
    /// movers in all possible directions. Movers are assigned to the
    /// cell they will visit on next step in the direction of movement
    /// (hence MoveField is 4xFLAT_SIZE), and have the weight according to
    /// movement probability distribution
    movers: MoverField,
}
impl Default for Subway {
    fn default() -> Self {
        Self::new()
    }
}

#[wasm_bindgen]
impl Subway {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Subway {
            field: [Cell::Wall; FLAT_SIZE],
            visited: SVector::zeros(),
            movers: SMatrix::zeros(),
        }
    }

    pub fn to_idx(&self, row: usize, col: usize) -> usize {
        row * SIZE_X + col
    }

    /// Set cell type
    pub fn set_field(&mut self, idx: usize, cell: Cell) {
        let x = idx % SIZE_X;
        let y = idx / SIZE_X;
        if (1..=SIZE_X - 2).contains(&x) && (1..=SIZE_Y - 2).contains(&y) {
            self.field[idx] = cell;
        }
    }
    /// Get cell type
    pub fn get_field(&self, idx: usize) -> Cell {
        self.field[idx]
    }
    /// Get probability for a cell
    pub fn get_visited_probability(&self, idx: usize) -> f64 {
        self.visited[idx]
    }

    /// Get possible movements (with move count dynamics)
    fn get_movement(
        &self,
        idx: usize,
        in_direction: Direction,
        move_count: u32,
    ) -> (DirIndexVec, DirVec) {
        // Walls and exit conditions
        if (self.field[idx] == Cell::Wall)
            || (self.field[idx] == Cell::Entrance && move_count >= 20)
            || (self.field[idx] == Cell::Treasury || self.field[idx] == Cell::Subtreasury)
        {
            return ([idx; 4], DirVec::zeros());
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
            return (offsets, probs);
        }
        match walls {
            [true, true, true, true] => (offsets, DirVec::zeros()),
            [true, true, true, false] => (offsets, DirVec::from([0., 0., 0., 1.])),
            [true, true, false, true] => (offsets, DirVec::from([0., 0., 1., 0.])),
            [true, false, true, true] => (offsets, DirVec::from([0., 1., 0., 0.])),
            [false, true, true, true] => (offsets, DirVec::from([1., 0., 0., 0.])),
            [true, true, _, false] => (offsets, DirVec::from([0., 0., 0., 1.])),
            [true, false, _, true] => (offsets, DirVec::from([0., 0.8, 0.2, 0.])),
            [true, false, _, false] => (offsets, DirVec::from([0., 0.8, 0., 0.2])),
            [false, true, _, _] => (offsets, DirVec::from([1., 0., 0., 0.])),
            [false, false, _, true] => (offsets, DirVec::from([0.85, 0.15, 0., 0.])),
            [false, false, false, false] => (offsets, DirVec::from([0.85, 0.15, 0., 0.])),
            [false, false, true, false] => (offsets, DirVec::zeros()),
        }
    }

    /// Initialize probability matrix for first step
    pub fn init(&mut self) {
        self.visited = SVector::zeros();
        self.movers = SMatrix::zeros();
        for idx in 0..FLAT_SIZE {
            let x = idx % SIZE_X;
            let y = idx / SIZE_X;
            // Guard rails
            if x == 0 || x == SIZE_X - 1 || y == 0 || y == SIZE_Y - 1 {
                continue;
            }

            // Set entry point probability
            if self.field[idx] == Cell::Entrance {
                self.visited[idx] = 1.0;
                let (move_idx, move_probs) = self.get_movement(idx, Direction::South, 0);
                for (dir, next_idx) in move_idx.iter().enumerate() {
                    self.movers[(dir, *next_idx)] = move_probs[dir];
                }
            }
        }
    }

    /// Perform a mover step
    pub fn step(&mut self, step_number: u32) {
        let mut next_movers = MoverField::zeros();
        let zero_dir = DirVec::zeros();

        // update probability matrix: add all movers locations.
        // This will go over 100% for cells visited multiple times,
        // but will have correct counts for exit points
        let movers_sum = self.movers.row_sum_tr();
        self.visited += movers_sum;

        // move movers (inside guard rails)
        for idx in SIZE_X..FLAT_SIZE - SIZE_X {
            if self.movers.column(idx).eq(&zero_dir) {
                continue;
            }
            for d in [
                Direction::North,
                Direction::East,
                Direction::South,
                Direction::West,
            ] {
                let mover_prob = self.movers[(d as usize, idx)];
                if mover_prob == 0. {
                    continue;
                }

                let (mover_next_cells, probs) = self.get_movement(idx, d.opposite(), step_number);
                for (dir, &next_idx) in mover_next_cells.iter().enumerate() {
                    if next_idx != idx {
                        // combine movers
                        next_movers[((dir + d as usize) % 4, next_idx)] += probs[dir] * mover_prob;
                    }
                }
            }
        }

        // copy over new data
        for i in 0..FLAT_SIZE {
            self.movers.set_column(i, &next_movers.column(i));
        }
    }

    /// Reset the field to initial state
    pub fn reset(&mut self) {
        self.field = [Cell::Wall; FLAT_SIZE];
        self.visited = SVector::zeros();
        self.movers = SMatrix::zeros();
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
    fn test_locality() {
        let mut subway = Subway::new();
        subway.set_field(128, Cell::Entrance);
        subway.set_field(127, Cell::Pass);
        subway.set_field(126, Cell::Pass);
        subway.set_field(125, Cell::Treasury);

        subway.init();

        let (indices, probs) = subway.get_movement(127, Direction::East, 1);
        assert_eq!(indices, [126, 107, 128, 147]);
        assert_eq!(probs.as_slice(), [1., 0., 0., 0.]);

        let (indices, probs) = subway.get_movement(125, Direction::East, 1);
        assert_eq!(indices, [125, 125, 125, 125]);
        assert_eq!(probs.as_slice(), [0., 0., 0., 0.]);
    }

    #[wasm_bindgen_test]
    fn test_freeway() {
        let mut subway = Subway::new();
        subway.set_field(128, Cell::Entrance);
        subway.set_field(127, Cell::Pass);
        subway.set_field(126, Cell::Pass);
        subway.set_field(125, Cell::Treasury);

        subway.init();

        assert_eq!(subway.get_field(128), Cell::Entrance);
        assert_eq!(subway.visited[128], 1.);

        // mover configuration: only one pointing to the west,
        // already moved away from starting point
        assert_eq!(subway.movers.column(128).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(subway.movers.column(127).as_slice(), [0., 0., 0., 1.]);
        assert_eq!(subway.movers.column(126).as_slice(), [0., 0., 0., 0.]);

        // do a step
        subway.step(1);
        assert_eq!(subway.visited[127], 1.);

        assert_eq!(subway.movers.column(128).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(subway.movers.column(127).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(
            subway.movers.column(126).as_slice(),
            [0., 0., 0., 1.],
            "Movers 125-128: {:?}",
            subway.movers.fixed_columns::<4>(125).into_owned(),
        );

        // do a step
        subway.step(2);
        assert_eq!(subway.visited[126], 1.);

        assert_eq!(subway.movers.column(128).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(subway.movers.column(127).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(subway.movers.column(126).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(
            subway.movers.column(125).as_slice(),
            [0., 0., 0., 1.],
            "Movers 125-128: {:?}",
            subway.movers.fixed_columns::<4>(125).into_owned(),
        );

        // do a step
        subway.step(3);
        assert_eq!(subway.visited[125], 1.);

        assert_eq!(subway.movers.column(128).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(subway.movers.column(127).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(subway.movers.column(126).as_slice(), [0., 0., 0., 0.]);
        assert_eq!(
            subway.movers.column(125).as_slice(),
            [0., 0., 0., 0.],
            "Movers 125-128: {:?}",
            subway.movers.fixed_columns::<4>(125).into_owned(),
        );
    }

    #[wasm_bindgen_test]
    fn test_loop() {
        let mut subway = Subway::new();
        subway.set_field(86, Cell::Pass);
        subway.set_field(87, Cell::Pass);
        subway.set_field(88, Cell::Pass);
        subway.set_field(106, Cell::Pass);
        subway.set_field(107, Cell::Pass);
        subway.set_field(108, Cell::Pass);
        subway.set_field(126, Cell::Pass);
        subway.set_field(127, Cell::Treasury);
        subway.set_field(128, Cell::Entrance);
        subway.init();
        subway.step(1);
        subway.step(2);
        subway.step(3);

        assert_eq!(subway.visited[127], 0.5);
        subway.step(4);
        subway.step(5);
        subway.step(6);
        subway.step(7);

        assert!(subway.visited[127] > 0.5, "Two paths converged");
        assert_eq!(subway.visited[107], 0.0, "Center point not visited");
    }
}
