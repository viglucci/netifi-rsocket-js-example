const WebSocket = require('ws');
const { Netifi } = require('netifi-js-client');
const { HelloServiceServer } = require('./generated/rsocket/HelloService_rsocket_pb');
const { DefaultHelloService } = require('./services/DefaultHelloService');
const {
    SimpleMeterRegistry,
    MetricsSnapshotHandlerClient,
    MetricsExporter
} = require('rsocket-rpc-metrics');

const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const groupName = 'netifi-rsocket-js-example.servers';
const desginationName = `server-rsocket-publisher-${id}`;
const netifiGateway = Netifi.create({
    setup: {
        group: groupName,
        destination: desginationName,
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

const helloService = new DefaultHelloService(desginationName);
const helloServiceServer = new HelloServiceServer(helloService, undefined, meterRegistry);

netifiGateway.addService('com.viglucci.netifi.rsocket.js.example.service.HelloService', helloServiceServer);

module.exports = netifiGateway;
