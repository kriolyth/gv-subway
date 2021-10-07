use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum Cell {
    Wall = 0,
    Pass = 1,
    Entrance = 2,
    Treasury = 3,
    Subtreasury = 4,
}

pub type Field = [Cell; 400];

#[wasm_bindgen]
pub struct Subway {
    field: Field,
}

#[wasm_bindgen]
impl Subway {
    pub fn new() -> Self {
        Subway {
            field: [Cell::Wall; 400],
        }
    }

    pub fn set_field(&mut self, id: usize, cell: Cell) {
        self.field[id] = cell;
    }
    pub fn get_field(&mut self, id: usize) -> Cell {
        self.field[id]
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
                Cell::Entrance => f.write_str("[🚪]")
            }
        }
    }

    #[wasm_bindgen_test]
    fn get_set_field() {
        let mut subway = Subway::new();
        subway.set_field(128, Cell::Entrance);
        subway.set_field(127, Cell::Pass);
        subway.set_field(126, Cell::Treasury);

        assert_eq!(subway.get_field(128), Cell::Entrance);
    }
}