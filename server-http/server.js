const consoleDecorator = require('console-stamp');
const throng = require('throng');

consoleDecorator(console, {
    label: true,
    pattern: 'HH:MM:ss.l',
    metadata: `[${process.pid}]`
});

const HTTP_PORT = 3000;

throng({
  workers: 1,
  master: () => {
    console.log('Starting master process');
  },
  start: async (id) => {
    const getApp = require('./app');
    const app = await getApp();
    app.listen(HTTP_PORT, () => console.log(`Child process #${id} listening on port ${HTTP_PORT}`));
  }
});
