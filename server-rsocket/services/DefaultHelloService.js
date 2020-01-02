const {HelloResponse} = require('../generated/rsocket/services_pb');
const {Single} = require('rsocket-flowable');

class DefaultHelloService {
    constructor() {
        this.serviceName = "com.viglucci.netifi.rsocket.js.example.service.HelloService";
    }

    sayHello(message) {
        const messageName = message.getName();
        console.log(`Received Hello from ${messageName}`);
        console.log(`Responding...`);
        const responseMessage = new HelloResponse();
        responseMessage.setMessage(`Hello, ${messageName} from ${this.serviceName}`);
        return Single.of(responseMessage);
    }
}

module.exports = {
    DefaultHelloService
};
