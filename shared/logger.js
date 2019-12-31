const consoleDecorator = require('console-stamp');

consoleDecorator(console, {
    label: true,
    pattern: 'HH:MM:ss.l',
    metadata: `[${process.pid}]`
});

module.exports = console;
