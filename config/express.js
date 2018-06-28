var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

var home = require('../app/routes/home');

module.exports = function() {
    var app = express();

    //environment variables
    app.set('port', 3000);

    //view engine EJS
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //middleware
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    //routes, configs and assignments
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);
    
    return app;
}