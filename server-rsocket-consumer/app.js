const express = require('express');
const requestLoggerFactory = require('morgan');
const WebSocket = require('ws');
const { Netifi } = require('netifi-js-client');
const { HelloServiceClient } = require('./generated/rsocket/HelloService_rsocket_pb');
const { HelloRequest } = require('./generated/rsocket/HelloService_pb');
const {
    SimpleMeterRegistry,
    MetricsSnapshotHandlerClient,
    MetricsExporter
} = require('rsocket-rpc-metrics');

const clientGroupName = 'netifi-rsocket-js-example.clients';
const serversGroupName = 'netifi-rsocket-js-example.servers';
const netifiGateway = Netifi.create({
    setup: {
        group: clientGroupName,
        destination: 'server-rsocket-consumer',
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

const gatewayConnectionA = netifiGateway.group(serversGroupName);
const helloServiceClientA = new HelloServiceClient(gatewayConnectionA, undefined, meterRegistry);

metricsExporter.start();

const request = new HelloRequest();
request.setName(`Server RSocket Consumer Client A ${(new Date()).toISOString()}`);

function getRandomInt(lower, upper) {
    return Math.floor(lower + (Math.random() * (upper - lower + 1)));
}

const runStreamCall = () => {
    helloServiceClientA.sayHelloStreamResponses(request).subscribe({
        onComplete: () => {
            const timeoutDuration = 3000;
            // const timeoutDuration = getRandomInt(300, 500);
            setTimeout(() => {
                runStreamCall();
            }, timeoutDuration);
        },
        onError: (error) => {
            return console.error(error);
        },
        onNext: (response) => {
            console.log(`HelloService response recieved with message: ${response.getMessage()}`);
        },
        // Nothing happens until `request(n)` is called
        onSubscribe: (sub) => {
            return sub.request(getRandomInt(1, 1));
        },
    });
};

runStreamCall();

// setInterval(() => {
//     const request = new HelloRequest();
//     request.setName('Server RSocket Consumer Client A');
//     helloServiceClientA.sayHelloFAF(request).subscribe({
//         onComplete: () => {
//             console.log(`sayHelloFAF completed`);
//         },
//         onError: (error) => {
//             console.log(`HelloService responded with error: ${error.name}`);
//             console.error(error);
//         }
//     });
// }, 1000);

// setInterval(() => {
//     const request = new HelloRequest();
//     request.setName('Server RSocket Consumer Client A');
//     helloServiceClientA.sayHello(request).subscribe({
//         onComplete: (response) => {
//             console.log(`HelloService response recieved with message: ${response.getMessage()}`);
//         },
//         onError: (error) => {
//             console.log(`HelloService responded with error: ${error.name}`);
//             console.error(error);
//         }
//     });
// }, 500);

const httpApp = express();

httpApp.use(requestLoggerFactory('combined'));

httpApp.get('/', (req, res) => {
    res.send('server-rsocket-consumer');
});

module.exports = async () => {
    return Promise.all([
        netifiGateway,
        httpApp
    ]);
};
