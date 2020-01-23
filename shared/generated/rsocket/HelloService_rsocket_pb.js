// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var HelloService_pb = require('./HelloService_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var HelloServiceClient = function () {
    function HelloServiceClient(rs, tracer, meterRegistry) {
        this._rs = rs;
        this._tracer = tracer;
        this.sayHelloFAFTrace = rsocket_rpc_tracing.traceSingle(tracer, "HelloService", { "rsocket.rpc.service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHelloFAF" }, { "rsocket.rpc.role": "client" });
        this.sayHelloFAFMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "HelloService", { "service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHelloFAF" }, { "role": "client" });
        this.sayHelloTrace = rsocket_rpc_tracing.traceSingle(tracer, "HelloService", { "rsocket.rpc.service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHello" }, { "rsocket.rpc.role": "client" });
        this.sayHelloMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "HelloService", { "service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHello" }, { "role": "client" });
        this.sayHelloStreamResponsesTrace = rsocket_rpc_tracing.trace(tracer, "HelloService", { "rsocket.rpc.service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHelloStreamResponses" }, { "rsocket.rpc.role": "client" });
        this.sayHelloStreamResponsesMetrics = rsocket_rpc_metrics.timed(meterRegistry, "HelloService", { "service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHelloStreamResponses" }, { "role": "client" });
        this.streamSayHelloAndResponsesTrace = rsocket_rpc_tracing.trace(tracer, "HelloService", { "rsocket.rpc.service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "streamSayHelloAndResponses" }, { "rsocket.rpc.role": "client" });
        this.streamSayHelloAndResponsesMetrics = rsocket_rpc_metrics.timed(meterRegistry, "HelloService", { "service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "streamSayHelloAndResponses" }, { "role": "client" });
    }
    // single request no response
    HelloServiceClient.prototype.sayHelloFAF = function sayHelloFAF(message, metadata) {
        const map = {};
        return this.sayHelloFAFMetrics(
            this.sayHelloFAFTrace(map)(new rsocket_flowable.Single(subscriber => {
                var dataBuf = Buffer.from(message.serializeBinary());
                var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
                var metadataBuf = rsocket_rpc_frames.encodeMetadata('com.viglucci.netifi.rsocket.js.example.service.HelloService', 'SayHelloFAF', tracingMetadata, metadata || Buffer.alloc(0));
                this._rs.requestResponse({
                    data: dataBuf,
                    metadata: metadataBuf
                }).map(function (payload) {
                    //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
                    var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
                    return google_protobuf_empty_pb.Empty.deserializeBinary(binary);
                }).subscribe(subscriber);
            })
            )
        );
    };
    // single request single response
    HelloServiceClient.prototype.sayHello = function sayHello(message, metadata) {
        const map = {};
        return this.sayHelloMetrics(
            this.sayHelloTrace(map)(new rsocket_flowable.Single(subscriber => {
                var dataBuf = Buffer.from(message.serializeBinary());
                var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
                var metadataBuf = rsocket_rpc_frames.encodeMetadata('com.viglucci.netifi.rsocket.js.example.service.HelloService', 'SayHello', tracingMetadata, metadata || Buffer.alloc(0));
                this._rs.requestResponse({
                    data: dataBuf,
                    metadata: metadataBuf
                }).map(function (payload) {
                    //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
                    var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
                    return HelloService_pb.HelloResponse.deserializeBinary(binary);
                }).subscribe(subscriber);
            })
            )
        );
    };
    // single request many responses
    HelloServiceClient.prototype.sayHelloStreamResponses = function sayHelloStreamResponses(message, metadata) {
        const map = {};
        return this.sayHelloStreamResponsesMetrics(
            this.sayHelloStreamResponsesTrace(map)(new rsocket_flowable.Flowable(subscriber => {
                var dataBuf = Buffer.from(message.serializeBinary());
                var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
                var metadataBuf = rsocket_rpc_frames.encodeMetadata('com.viglucci.netifi.rsocket.js.example.service.HelloService', 'SayHelloStreamResponses', tracingMetadata, metadata || Buffer.alloc(0));
                this._rs.requestStream({
                    data: dataBuf,
                    metadata: metadataBuf
                }).map(function (payload) {
                    //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
                    var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
                    return HelloService_pb.HelloResponse.deserializeBinary(binary);
                }).subscribe(subscriber);
            })
            )
        );
    };
    // many request many responses
    HelloServiceClient.prototype.streamSayHelloAndResponses = function streamSayHelloAndResponses(messages, metadata) {
        const map = {};
        return this.streamSayHelloAndResponsesMetrics(
            this.streamSayHelloAndResponsesTrace(map)(new rsocket_flowable.Flowable(subscriber => {
                var dataBuf;
                var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
                var metadataBuf;
                this._rs.requestChannel(messages.map(function (message) {
                    dataBuf = Buffer.from(message.serializeBinary());
                    metadataBuf = rsocket_rpc_frames.encodeMetadata('com.viglucci.netifi.rsocket.js.example.service.HelloService', 'StreamSayHelloAndResponses', tracingMetadata, metadata || Buffer.alloc(0));
                    return {
                        data: dataBuf,
                        metadata: metadataBuf
                    };
                })).map(function (payload) {
                    //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
                    var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
                    return HelloService_pb.HelloResponse.deserializeBinary(binary);
                }).subscribe(subscriber);
            })
            )
        );
    };
    return HelloServiceClient;
}();

exports.HelloServiceClient = HelloServiceClient;

var HelloServiceServer = function () {
    function HelloServiceServer(service, tracer, meterRegistry) {
        this._service = service;
        this._tracer = tracer;
        this.sayHelloFAFTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "HelloService", { "rsocket.rpc.service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHelloFAF" }, { "rsocket.rpc.role": "server" });
        this.sayHelloFAFMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "HelloService", { "service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHelloFAF" }, { "role": "server" });
        this.sayHelloTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "HelloService", { "rsocket.rpc.service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHello" }, { "rsocket.rpc.role": "server" });
        this.sayHelloMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "HelloService", { "service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHello" }, { "role": "server" });
        this.sayHelloStreamResponsesTrace = rsocket_rpc_tracing.traceAsChild(tracer, "HelloService", { "rsocket.rpc.service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHelloStreamResponses" }, { "rsocket.rpc.role": "server" });
        this.sayHelloStreamResponsesMetrics = rsocket_rpc_metrics.timed(meterRegistry, "HelloService", { "service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "sayHelloStreamResponses" }, { "role": "server" });
        this.streamSayHelloAndResponsesTrace = rsocket_rpc_tracing.traceAsChild(tracer, "HelloService", { "rsocket.rpc.service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "streamSayHelloAndResponses" }, { "rsocket.rpc.role": "server" });
        this.streamSayHelloAndResponsesMetrics = rsocket_rpc_metrics.timed(meterRegistry, "HelloService", { "service": "com.viglucci.netifi.rsocket.js.example.service.HelloService" }, { "method": "streamSayHelloAndResponses" }, { "role": "server" });
        this._channelSwitch = (payload, restOfMessages) => {
            if (payload.metadata == null) {
                return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
            }
            var method = rsocket_rpc_frames.getMethod(payload.metadata);
            var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
            let deserializedMessages;
            switch (method) {
                case 'StreamSayHelloAndResponses':
                    deserializedMessages = restOfMessages.map(payload => {
                        var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
                        return HelloService_pb.HelloRequest.deserializeBinary(binary);
                    });
                    return this.streamSayHelloAndResponsesMetrics(
                        this.streamSayHelloAndResponsesTrace(spanContext)(
                            this._service
                                .streamSayHelloAndResponses(deserializedMessages, payload.metadata)
                                .map(function (message) {
                                    return {
                                        data: Buffer.from(message.serializeBinary()),
                                        metadata: Buffer.alloc(0)
                                    }
                                })
                        )
                    );
                default:
                    return rsocket_flowable.Flowable.error(new Error('unknown method'));
            }
        };
    }
    HelloServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
        throw new Error('fireAndForget() is not implemented');
    };
    HelloServiceServer.prototype.requestResponse = function requestResponse(payload) {
        try {
            if (payload.metadata == null) {
                return rsocket_flowable.Single.error(new Error('metadata is empty'));
            }
            var method = rsocket_rpc_frames.getMethod(payload.metadata);
            var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
            switch (method) {
                case 'SayHelloFAF':
                    return this.sayHelloFAFMetrics(
                        this.sayHelloFAFTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
                            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
                            return this._service
                                .sayHelloFAF(HelloService_pb.HelloRequest.deserializeBinary(binary), payload.metadata)
                                .map(function (message) {
                                    return {
                                        data: Buffer.from(message.serializeBinary()),
                                        metadata: Buffer.alloc(0)
                                    }
                                }).subscribe(subscriber);
                        }
                        )
                        )
                    );
                case 'SayHello':
                    return this.sayHelloMetrics(
                        this.sayHelloTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
                            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
                            return this._service
                                .sayHello(HelloService_pb.HelloRequest.deserializeBinary(binary), payload.metadata)
                                .map(function (message) {
                                    return {
                                        data: Buffer.from(message.serializeBinary()),
                                        metadata: Buffer.alloc(0)
                                    }
                                }).subscribe(subscriber);
                        }
                        )
                        )
                    );
                default:
                    return rsocket_flowable.Single.error(new Error('unknown method'));
            }
        } catch (error) {
            return rsocket_flowable.Single.error(error);
        }
    };
    HelloServiceServer.prototype.requestStream = function requestStream(payload) {
        try {
            if (payload.metadata == null) {
                return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
            }
            var method = rsocket_rpc_frames.getMethod(payload.metadata);
            var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
            switch (method) {
                case 'SayHelloStreamResponses':
                    return this.sayHelloStreamResponsesMetrics(
                        this.sayHelloStreamResponsesTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
                            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
                            return this._service
                                .sayHelloStreamResponses(HelloService_pb.HelloRequest.deserializeBinary(binary), payload.metadata)
                                .map(function (message) {
                                    return {
                                        data: Buffer.from(message.serializeBinary()),
                                        metadata: Buffer.alloc(0)
                                    }
                                }).subscribe(subscriber);
                        }
                        )
                        )
                    );
                default:
                    return rsocket_flowable.Flowable.error(new Error('unknown method'));
            }
        } catch (error) {
            return rsocket_flowable.Flowable.error(error);
        }
    };
    HelloServiceServer.prototype.requestChannel = function requestChannel(payloads) {
        return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
            new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
        );
    };
    HelloServiceServer.prototype.metadataPush = function metadataPush(payload) {
        return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
    };
    return HelloServiceServer;
}();

exports.HelloServiceServer = HelloServiceServer;

