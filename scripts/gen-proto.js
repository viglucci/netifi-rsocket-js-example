const argv = require('yargs').argv
const shell = require('shelljs');
const path = require('path');
const logger = require('../shared/logger');

const args = argv._;
const fileNames = args[0].split(',');

const PROTOC_GEN_PLUGIN_PATH = path.resolve('./node_modules/.bin/rsocket_rpc_js_protoc_plugin.cmd');

const OUT_DIR = path.resolve('./shared/generated/rsocket');

const RSOCKET_PROTO_PATH = path.resolve('node_modules/rsocket-rpc-protobuf/proto');
const PROTO_PATH = path.resolve('./proto');

const getFilePath = (fileName) => {
    return path.resolve(`./proto/${fileName}.proto`);
};

const results = [];
fileNames.forEach((fileName) => {
    const INPUT_PATH = getFilePath(fileName);

    let cmd = [
        `protoc`,
        `--proto_path=${PROTO_PATH}`,
        `--proto_path=${RSOCKET_PROTO_PATH}`,
        `--rsocket_rpc_out=${OUT_DIR}`,
        `--js_out="import_style=commonjs,binary:${OUT_DIR}"`,
        `--plugin="protoc-gen-rsocket_rpc=${PROTOC_GEN_PLUGIN_PATH}"`,
        `${INPUT_PATH}`
    ];

    cmd = cmd.join(' ');

    logger.info(cmd);

    // Run external tool synchronously
    if (shell.exec(cmd).code !== 0) {
        logger.error('Error: command failed');
        results.push(1);
    } else {
        logger.info('Command finished!');
        results.push(0);
    }
});

const nonZeroCodes = results.filter(Boolean);

if (nonZeroCodes.length) {
    // exit with the first non zero code in the Array
    shell.exit(nonZeroCodes[0]);
}
