var http = require('http');
var app = require('./config/express')();

require('./config/passport')();
require('./config/database.js')('mongodb://ggentil:proto25@ds245287.mlab.com:45287/proto-node-mvc');

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server executando na porta ' + app.get('port'));
});


// http.createServer(function(req, res) {
//     let data = {
//         name: "Drauzio",
//         surname: "Varella",
//         address: "Rua Paris",
//         number: 789,
//         phone: "(11) 95786-8869"
//     }

//     let response = {
//         success: true,
//         message: null,
//         data: data
//     }

//     res.writeHead(200, {'Content-Type': 'json'});
//     res.end(JSON.stringify(response));
// }).listen(3000, '127.0.0.1');