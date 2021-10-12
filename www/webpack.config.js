const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const { DefinePlugin } = require('webpack')


module.exports = {
    entry: "./bootstrap.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bootstrap.js", // filename referenced in index.html
    },
    mode: 'production',

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
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]

            }
        ]
    },

    plugins: [
        new DefinePlugin({
            __VUE_PROD_DEVTOOLS__: false,
            __VUE_OPTIONS_API__: true
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new VueLoaderPlugin(),
    ],

    experiments: {
        syncWebAssembly: true
    }

}