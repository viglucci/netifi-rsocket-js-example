const path = require('path');
const webpack = require('webpack');

const commonExcludes = /(node_modules|bower_components)/;

module.exports = {
    mode: 'development',
    context: path.resolve('./resources'),
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
        './js/react-app-entry.js'
    ],
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(`${__dirname}/static-assets`),
        publicPath: '/static-assets'
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: commonExcludes,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
