const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    context: path.resolve("./resources"),
    entry: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true",
        "./react-app-entry.js"
    ],
    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(`${__dirname}/static-assets`),
        publicPath: "/static-assets"
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};