var PROTO_PATH = __dirname + '/protos/helloworld.proto';
var mysql      = require('mysql');
var grpc = require('grpc');
var appconfig = require('./appconfig.json');
var hello_proto = grpc.load(PROTO_PATH).helloworld;
var server = new grpc.Server();
var connection = mysql.createConnection({
  host     : appconfig.mysql['hostname'],
  user     : appconfig.mysql['user'],
  password : appconfig.mysql['password'],
  database : appconfig.mysql['database']
});

exports.conn = connection;
connectToMysql();

var users = require('./models/users');





function connectToGrpc(){
  server.addProtoService(hello_proto.Greeter.service, {sayHello: users.sayHellox});
  server.bind(appconfig.grpc['server']+appconfig.grpc['port'], grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Running gRPC Server on Port "+appconfig.grpc['port']);
}

function connectToMysql(){
  connection.connect(function (err) {
    if(err){
      console.log("MySql : Connection to  "+appconfig.mysql['hostname'] + " error : "+err);
    }else {
      console.log("MySql :  Connection to  "+appconfig.mysql['hostname'] + " success");
    }
  });
}


var main = function () {
  connectToGrpc();

}

main();





