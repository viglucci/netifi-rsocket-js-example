const express = require('express');
const requestLoggerFactory = require('morgan');
const webpackFactory = require('webpack');
const webpackDevMiddlewareFactory = require('webpack-dev-middleware');
const webpackHotMiddlewareFactory = require('webpack-hot-middleware');

const webpackConfig = require('../webpack.config');
const webpackCompilerInstance = webpackFactory(webpackConfig);

const webpackDevMiddleware = webpackDevMiddlewareFactory(webpackCompilerInstance, {
    index: false,
    logLevel: 'warn',
    publicPath: webpackConfig.output.publicPath,
    watchOptions: webpackConfig.watchOptions
});

const webpackHotMiddleware = webpackHotMiddlewareFactory(webpackCompilerInstance, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    reload: true
});

const app = express();

app.set('view engine', 'pug');
app.set('views', './resources/views');

app.use(webpackDevMiddleware);
app.use(webpackHotMiddleware);

app.use(requestLoggerFactory('combined'));

app.get('/', (req, res) => {
    res.render('index.pug');
});

module.exports = async () => {
    return Promise.resolve(app);
};
