const throng = require('throng');

const HTTP_PORT = 3000;

throng({
  workers: 1,
  master: () => {
    console.log('Starting master process');
  },
  start: async (id) => {
    const getApp = require('./app');
    const app = await getApp();
    app.listen(HTTP_PORT, () => console.log(`Worker ${id} listening on port ${HTTP_PORT}`));
  }
});
