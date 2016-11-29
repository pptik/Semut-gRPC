var PROTO_PATH = __dirname + '/../protos/semutrpc.proto';
var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).semutrpc;

function main() {
  var client = new hello_proto.UsersManagement('localhost:50071', grpc.credentials.createInsecure());
  var user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'world';
  }
  client.login({email: "caliandrat9@gmail.com", password:"qwerty"}, function(err, response) {
    console.log(response);
  });
}

main();
