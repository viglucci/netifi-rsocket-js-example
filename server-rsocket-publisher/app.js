const express = require('express');
const requestLoggerFactory = require('morgan');
const WebSocket = require('ws');
const { Netifi } = require('netifi-js-client');
const { HelloServiceServer } = require('./generated/rsocket/services_rsocket_pb');
const { DefaultHelloService } = require('./services/DefaultHelloService');
const {
    SimpleMeterRegistry,
    MetricsSnapshotHandlerClient,
    MetricsExporter
} = require('rsocket-rpc-metrics');

const groupName = 'netifi-rsocket-js-example.servers';
const netifiGateway = Netifi.create({
    setup: {
        group: groupName,
        destination: 'server-rsocket-publisher',
        accessKey: process.env.NETIFI_AUTHENTICATION_0_ACCESSKEY,
        accessToken: process.env.NETIFI_AUTHENTICATION_0_ACCESSTOKEN,
    },
    transport: {
        url: 'ws://netifi-broker:8101/',
        wsCreator: (url) => {
            return new WebSocket(url);
        }
    }
});

const meterRegistry = new SimpleMeterRegistry();

const metricsClient = new MetricsSnapshotHandlerClient(
    netifiGateway.group('com.netifi.broker.metrics')
);

const metricsExporter = new MetricsExporter(
    metricsClient,
    meterRegistry,
    5, // 5 seconds
    1024,
);

metricsExporter.start();

const helloService = new DefaultHelloService();
const helloServiceServer = new HelloServiceServer(helloService, undefined, meterRegistry);

netifiGateway.addService('com.viglucci.netifi.rsocket.js.example.service.HelloService', helloServiceServer);

const httpApp = express();

httpApp.use(requestLoggerFactory('combined'));

httpApp.get('/', (req, res) => {
    res.send('server-rsocket-publisher');
});

module.exports = async () => {
    return Promise.all([
        netifiGateway,
        httpApp
    ]);
};
