var  app = require('../app');


exports.sayHellox = function (call, callback) {
    var email = call.request.email;
    var pass = call.request.password;
    if(email == null || pass == null){
        callback(null, {message: 'Incomplete Parameter'});
    }else {
        app.conn.query('SELECT * FROM tb_user WHERE Email = "' + email + '"', function (err, rows, fields) {
            if (err) {

            } else {
                var data = JSON.stringify(rows[0]);
                data = JSON.parse(data);
                console.log('The solution is: ', data.Name);
                callback(null, {message: JSON.stringify(data)});
            }
        });
    }
}


