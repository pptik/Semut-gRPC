
exports.sayHellox = function (call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
    console.log(call);
}