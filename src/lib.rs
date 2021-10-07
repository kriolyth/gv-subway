use wasm_bindgen::prelude::*;
mod field;

#[cfg(not(test))]
#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    Ok(())
}

