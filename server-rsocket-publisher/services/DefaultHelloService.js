const { HelloResponse } = require('../generated/rsocket/HelloService_pb');
const { Single, Flowable } = require('rsocket-flowable');
const { Empty } = require('google-protobuf/google/protobuf/empty_pb.js');

class DefaultHelloService {
    constructor(desginationName) {
        this.serviceName = `DefaultHelloService(${desginationName})`;
    }

    sayHello(message) {
        const messageName = message.getName();
        console.log(`[sayHello] Received Hello from ${messageName}`);
        const responseMessage = new HelloResponse();
        responseMessage.setMessage(`Hello, ${messageName} from ${this.serviceName}`);
        console.log(`Responding...`);
        return Single.of(responseMessage);
    }

    sayHelloFAF(message) {
        const messageName = message.getName();
        console.log(`[sayHelloFAF] Received Hello from ${messageName}`);
        return Single.of(new Empty());
    }

    sayHelloStreamResponses(message) {
        const messageName = message.getName();
        console.log(`[sayHelloStreamResponses] Received Hello from ${messageName}`);
        return new Flowable((subscriber) => {
            subscriber.onSubscribe({
                cancel: () => {/* no-op */ },
                request: (n) => {
                    while (n--) {
                        let completed = false;
                        let completedCalled = false;
                        if (n <= 0) {
                            completed = true;
                        }
                        setImmediate(() => {
                            if (!completedCalled) {
                                const responseMessage = new HelloResponse();
                                responseMessage.setMessage(`Hello, ${messageName} from ${this.serviceName} - ${(new Date()).toISOString()}`);
                                subscriber.onNext(responseMessage);
                            }
                            if (completed && !completedCalled) {
                                completedCalled = true;
                                subscriber.onComplete();
                            }
                        });
                    }
                }
            });
        });
    }
}

module.exports = {
    DefaultHelloService
};
