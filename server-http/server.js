const consoleDecorator = require('console-stamp');
const throng = require('throng');

consoleDecorator(console, {
    label: true,
    pattern: 'HH:MM:ss.l',
    metadata: `[${process.pid}]`
});

const HTTP_PORT = process.env.NODE_HTTP_PORT;

throng({
    workers: 1,
    master: () => {
        console.log('Starting master process');
    },
    start: async (id) => {
        const getApp = require('./app/app');
        const app = await getApp();
        app.listen(HTTP_PORT, () => {
            return console.log(`Child process #${id} listening on HTTP port ${HTTP_PORT}`)
        });
    }
});
