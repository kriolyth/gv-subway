mod field;
mod imga;
mod brief;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_version() -> String {
    option_env!("PACKAGE_VERSION")
        .unwrap_or("1.y")
        .to_string()
}

#[wasm_bindgen]
pub fn get_cookie_line() -> String {
    const MESSAGES: [&'static str; 9] = [
        "Вы слишком поздно пришли, и они закончились.",
        "Вы не представляете никакого интереса.",
        "Таков путь.",
        "Вы ведь так и не пригласили меня на чай.",
        "Даже без глютена.",
        "Зачем?",
        "Вам тут не рады просто так.",
        "Фабрика уже тридцать лет не работает.",
        "Хватит уже.",
    ];
    let pick = (web_sys::js_sys::Math::random() * MESSAGES.len() as f64).trunc() as usize;
    MESSAGES[pick].to_owned()
}

