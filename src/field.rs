use nalgebra::SMatrix;
use nalgebra::SVector;
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
    Boss = 5,
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

/// DirVec: movement probability, 4 directions normal and jump
type DirVec = SVector<f64, 8>;

/// DirIndexVec: cell index, 4 directions normal and jump
type DirIndexVec = [usize; 8];

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

    /// jump moves enabled
    jumpy: bool
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
            jumpy: false
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

    /// Mover directions when looking from south
    fn mover_probability(walls: [bool; 4]) -> [f64; 4] {
        match walls {
            [true, true, true, true] => [0., 0., 0., 0.],
            [true, true, true, false] => [0., 0., 0., 1.],
            [true, true, false, true] => [0., 0., 1., 0.],
            [true, false, true, true] => [0., 1., 0., 0.],
            [false, true, true, true] => [1., 0., 0., 0.],
            [true, true, _, false] => [0., 0., 0., 1.],
            [true, false, _, true] => [0., 0.8, 0.2, 0.],
            [true, false, _, false] => [0., 0.8, 0., 0.2],
            [false, true, _, _] => [1., 0., 0., 0.],
            [false, false, _, _] => [0.85, 0.15, 0., 0.],
        }
    }

    /// Get possible movements (with move count dynamics) from current cell `idx`
    /// when it was entered from direction `in_direction`.
    ///
    /// Returns indices of cells to move and probabilities to move in that direction
    ///
    /// Depending on `move_count` entrance cell may behave differently.
    fn get_movement(
        &self,
        idx: usize,
        in_direction: Direction,
        move_count: u32,
    ) -> (DirIndexVec, DirVec) {
        const JUMP_PROBABILITY: f64 = 0.2;

        // Walls and exit conditions
        if (self.field[idx] == Cell::Wall)
            || (self.field[idx] == Cell::Entrance && move_count >= 20)
            || (self.field[idx] == Cell::Treasury || self.field[idx] == Cell::Subtreasury)
        {
            return ([idx; 8], DirVec::zeros());
        }
        // cell indices for relative directions
        let indices = [
            idx + SIZE_X, // when going from north, next north cell is here
            idx.saturating_sub(1),
            idx.saturating_sub(SIZE_X),
            idx + 1,
            idx + SIZE_X, // cycle
            idx.saturating_sub(1),
            idx.saturating_sub(SIZE_X),
        ];
        let jump_indices = [
            idx + 2 * SIZE_X, // when going from north, next north cell is here
            idx.saturating_sub(2),
            idx.saturating_sub(2 * SIZE_X),
            idx + 2,
            idx + 2 * SIZE_X, // cycle
            idx.saturating_sub(2),
            idx.saturating_sub(2 * SIZE_X),
        ];
        let mut offsets: DirIndexVec = [0; 8];
        for i in 0..4 {
            offsets[i] = indices[in_direction as usize + i].min(FLAT_SIZE - 1);
            offsets[i + 4] = jump_indices[in_direction as usize + i].min(FLAT_SIZE - 1)
        }
        let walls = [
            self.field[offsets[0]] == Cell::Wall,
            self.field[offsets[1]] == Cell::Wall,
            self.field[offsets[2]] == Cell::Wall,
            self.field[offsets[3]] == Cell::Wall,
        ];
        let jump_walls = [
            self.field[offsets[4]] == Cell::Wall,
            self.field[offsets[5]] == Cell::Wall,
            self.field[offsets[6]] == Cell::Wall,
            self.field[offsets[7]] == Cell::Wall,
        ];
        let can_jump = self.jumpy && move_count >= 5 && !jump_walls.iter().all(|&v| v);

        if move_count == 0 && self.field[idx] == Cell::Entrance {
            // when initializing, movement at entrance is equally random
            // (and walk only)
            let num_freeways = walls.iter().filter(|&&x| !x).count();
            let prob = 1.0 / num_freeways as f64;
            let mut probs = DirVec::zeros();
            for i in 0..4 {
                probs[i] = if walls[i] { 0. } else { prob }
            }
            return (offsets, probs);
        }
        let mut result = DirVec::zeros();
        if !can_jump {
            result.as_mut_slice()[..4].copy_from_slice(&Subway::mover_probability(walls));
        } else {
            let move_probs = Subway::mover_probability(walls);
            let jump_probs = Subway::mover_probability(jump_walls);
            for i in 0..4 {
                result[i] = move_probs[i] * (1. - JUMP_PROBABILITY);
                result[i + 4] = jump_probs[i] * JUMP_PROBABILITY;
            }
        }
        (offsets, result)
    }

    /// Initialize probability matrix for first step
    pub fn init(&mut self, jumpy: bool) {
        self.visited = SVector::zeros();
        self.movers = SMatrix::zeros();
        self.jumpy = jumpy;
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
                    self.movers[(dir % 4, *next_idx)] = move_probs[dir];
                }
            }
        }
    }

    /// Perform a mover step
    pub fn step(&mut self, step_number: u32) {
        let mut next_movers = MoverField::zeros();
        let zero_dir = SVector::zeros();

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
                Cell::Boss => f.write_str("[💀]"),
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

        subway.init(false);

        let (indices, probs) = subway.get_movement(127, Direction::East, 1);
        assert_eq!(indices[..4], [126, 107, 128, 147]);
        assert_eq!(probs.as_slice(), [1., 0., 0., 0.,  0., 0., 0., 0.]);

        let (indices, probs) = subway.get_movement(125, Direction::East, 1);
        assert_eq!(indices[..4], [125, 125, 125, 125]);
        assert_eq!(probs.as_slice(), [0., 0., 0., 0., 0., 0., 0., 0.]);
    }

    #[wasm_bindgen_test]
    fn test_freeway() {
        let mut subway = Subway::new();
        subway.set_field(128, Cell::Entrance);
        subway.set_field(127, Cell::Pass);
        subway.set_field(126, Cell::Pass);
        subway.set_field(125, Cell::Treasury);

        subway.init(false);

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
        subway.init(false);
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
