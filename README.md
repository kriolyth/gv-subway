<div align="center">

  <h1><code>gv-subway</code></h1>

  <strong>Godville dungeon explorer</strong>

</div>

## About

Applying random movement to random mazes.

## Compile

Prerequisites: [Rust](https://www.rust-lang.org/learn/get-started), [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/), [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com).

1. Ensure you have wasm target installed:
```
rustup target add wasm32-unknown-unknown
```

2. Build WASM code
```
wasm-pack build --release
```

3. Download / update npm dependencies
```
cd www
npm install
```

4. Start in dev mode
```
npm run serve
```

5. Build complete page
```
npm run build
```

## Updating the model

Field mards are recognized with a small neural network. To accommodate for the new symbols this network has to be retrained.

1. Place screenshots into `data/mazes` directory.

2. Comment `#[ignore]` tag in `imga.rs:split_img()` test.

Start the test with 
```
cargo test --lib --target x86_64-pc-windows-msvc -- --nocapture
```

The test will split screenshots from `data/mazes` into separate cells in `data/proc` directory.

3. Move files into separate directories named as class numbers (see `imga.rd:Mark` type).

Save some of the files for evaluation. Update directories in `train_nn` and `evaluate_nn` tests.

4. Restore the `#[ignore]` tag on `split_img` test and remove the same tag on `train_nn` test.

Start the test with 
```
cargo test --lib --target x86_64-pc-windows-msvc -- --nocapture
```

The test will create or overwrite `nn.bin` file, which will be compiled in the binary on the next run.

5. Restore the `#[ignore]` tag on `train_nn` test and remove the same tag on `evaluate_nn` test.

Start the test the same way.


## License

Licensed under Apache License, Version 2.0, ([LICENSE](LICENSE)).

### Contribution

Unless you explicitly state otherwise, any contribution intentionally
submitted for inclusion in the work by you, as defined in the Apache-2.0
license, shall be licensed as above, without any additional terms or
conditions.
