const consoleDecorator = require('console-stamp');
const throng = require('throng');
const app = require('./app');

consoleDecorator(console, {
    label: true,
    pattern: 'HH:MM:ss.l',
    metadata: `[${process.pid}]`
});

throng({
    workers: 25,
    master: () => {
        console.log('Starting master process');
    },
    start: async (id) => {
        console.log(`Child process #${id} started`);
        app._connect().subscribe({
            onComplete: () => {
                console.log("RSocket connection established.");
            },
            onError: (err) => {
                console.error(err);
            }
        });
    }
});
