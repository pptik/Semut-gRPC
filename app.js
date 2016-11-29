var PROTO_PATH = __dirname + '/protos/helloworld.proto';
var mysql      = require('mysql');
var grpc = require('grpc');
var appconfig = require('./appconfig.json');
var hello_proto = grpc.load(PROTO_PATH).helloworld;
var server = new grpc.Server();
var test = require('./modules/test');





function connectToGrpc(){
  server.addProtoService(hello_proto.Greeter.service, {sayHello: test.sayHellox});
  server.bind(appconfig.grpc['server']+appconfig.grpc['port'], grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Running gRPC Server on Port "+appconfig.grpc['port']);
}

function connectToMysql(){
  var connection = mysql.createConnection({
    host     : appconfig.mysql['hostname'],
    user     : appconfig.mysql['user'],
    password : appconfig.mysql['password'],
    database : appconfig.mysql['database']
  });

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
  connectToMysql();
}

main();



