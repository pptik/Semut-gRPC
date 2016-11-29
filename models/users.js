var  app = require('../app');
var jsesc = require('jsesc');
var md5 = require('md5');

exports.login = function (call, callback) {
    var email = call.request.email;
    var pass = call.request.password;
    if(email == null || pass == null){
        var res = {success: false, message: 'Incomplete Parameter'}
        callback(null, {response: res});
    }else {
        app.conn.query('SELECT * FROM tb_user WHERE Email = "' + email + '"', function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                if(rows.length > 0) {
                    var data = rows[0];
                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    if(md5(pass) == data.Password){
                        var res = {success: true, message: "Berhasil Login"};
                        callback(null, {response: JSON.stringify(res)});
                    }else {
                        var res = {success: false, message: "Username Atau Password tidak cocok!"};
                        callback(null, {response: JSON.stringify(res)});
                    }
                }else {
                    var res = {success: false, message: 'Username Atau Password tidak cocok!'}
                    callback(null, {response: JSON.stringify(res)});
                }
            }
        });
    }
}


