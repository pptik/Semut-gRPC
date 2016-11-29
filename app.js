var PROTO_PATH = __dirname + '/protos/helloworld.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;
var test = require('./modules/test');




function main() {
  var server = new grpc.Server();
  server.addProtoService(hello_proto.Greeter.service, {sayHello: test.sayHellox});
  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();