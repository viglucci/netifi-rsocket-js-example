# Scripts

This directory includes scripts that provide quality of life functionality and support when working with this project. Any script ending with `.js` can be assumed to be runnable with node.js.

## gen-proto.js

The `gen-proto.js` script generates RSocket service client and server definitions by invoking [protoc](https://github.com/protocolbuffers/protobuf) with specific RSocket protoc plugins and `.proto` sources.

The script is intended to be run via `npm run build:proto`. The script is intended to allow for invocation with arguments, such as a comma seperated list of source files to generate from a fiven list of proto definition files.

This is useful as you have have other proto files in the directory with your RSocket protobuf service definitions causing the use of glob paths such as `proto/*.proto` being less than idea.

Example:

`node ./scripts/gen-proto.js ServiceA,ServiceB`
