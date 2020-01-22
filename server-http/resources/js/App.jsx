import React, { useEffect, useState } from 'react';
import { HelloRequest } from '../../generated/rsocket/services_pb';
import useHelloService from './useHelloService';

const App = () => {
    const helloService = useHelloService();
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        console.log(helloService);
        if (helloService) {
            const request = new HelloRequest();
            request.setName('React App');
            helloService.sayHello(request).subscribe({
                onComplete: (response) => {
                    console.log(`HelloService response recieved with message: ${response.getMessage()}`);
                    setMessages((currentMessages) => {
                        return [...currentMessages, response.getMessage()];
                    });
                },
                onError: (error) => {
                    console.log(`HelloService responded with error: ${error.name}`);
                    console.error(error);
                }
            });
        }
        return () => { };
    }, [helloService]);

    return (
        <div>
            <h1>Hello from React</h1>
            <ul>
                {messages.map((message, i) => {
                    return <li key={i}>{message}</li>
                })}
            </ul>
        </div>
    );
};

export default App;
