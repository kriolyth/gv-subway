const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');


module.exports = {
    entry: "./bootstrap.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bootstrap.js", // filename referenced in index.html
    },
    mode: 'development',

    resolve: {
        extensions: ['.ts', '.js', '.wasm', '.vue'],
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    },
                }
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new VueLoaderPlugin()
    ],

    experiments: {
        syncWebAssembly: true
    }

}