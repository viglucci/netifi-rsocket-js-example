import { useLayoutEffect, useState } from 'react';
const { Netifi } = require('netifi-js-client');
const { HelloServiceClient } = require('../../generated/rsocket/services_rsocket_pb');
const clientGroupName = 'netifi-rsocket-js-example.clients';
const serversGroupName = 'netifi-rsocket-js-example.servers';

function useHelloService() {
    const [currentHelloService, setCurrentHelloService] = useState(null);
    useLayoutEffect(() => {
        const netifiGateway = Netifi.create({
            setup: {
                group: clientGroupName,
                destination: 'server-rsocket-consumer',
                accessKey: process.env.NETIFI_AUTHENTICATION_0_ACCESSKEY,
                accessToken: process.env.NETIFI_AUTHENTICATION_0_ACCESSTOKEN,
            },
            transport: {
                url: 'ws://localhost:8101/',
                wsCreator: (url) => {
                    const ws = new WebSocket(url);
                    return ws;
                }
            }
        });
        const gatewayConnection = netifiGateway.group(serversGroupName);
        const helloServiceClient = new HelloServiceClient(gatewayConnection);
        setCurrentHelloService(helloServiceClient);
        return () => {
            console.log("CMP unmounted");
        };
    }, []);
    return currentHelloService;
}

export default useHelloService;
