var PROTO_PATH = __dirname + '/../protos/helloworld.proto';
var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

function main() {
  var client = new hello_proto.Greeter('localhost:50071',
                                       grpc.credentials.createInsecure());
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  client.sayHello({email: "mydedyhalim@gmail.com", password:"woah"}, function(err, response) {
    console.log(response.message);
  });
}

main();
