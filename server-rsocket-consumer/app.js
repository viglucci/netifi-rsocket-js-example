const express = require('express');
const requestLoggerFactory = require('morgan');
const WebSocket = require('ws');
const {Netifi} = require('netifi-js-client');
const {HelloServiceClient} = require('./generated/rsocket/services_rsocket_pb');
const {HelloRequest} = require('./generated/rsocket/services_pb');

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

const gatewayConnection = netifiGateway.group(serversGroupName);
const helloServiceClient = new HelloServiceClient(gatewayConnection);

const request = new HelloRequest();
request.setName('Server RSocket Consumer');

const executeRequest = () => {
    helloServiceClient.sayHello(request).subscribe({
        onComplete: (response) => {
            console.log(`HelloService response recieved with message: ${response.getMessage()}`);
        },
        onError: (error) => {
            console.log(`HelloService responded with error: ${error.name}`);
            console.error(error);
        }
    });
};

executeRequest();

setInterval(() => {
   executeRequest();
}, 3000);

const httpApp = express();

httpApp.use(requestLoggerFactory('combined'));

httpApp.get('/', (req, res, next) => {
    res.send('server-rsocket-consumer');
});

module.exports = async () => {
    return Promise.all([
        netifiGateway,
        httpApp
    ]);
};
