var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var serveStatic = require('serve-static');
var fs = require('fs');

var app = express();
var server = http.createServer(app).listen(3005, function () {
    console.log('Express server listening on port 3005');
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(errorhandler());
app.use(serveStatic(__dirname));
// redirect to /src
app.get('/', function (req, res) {
    res.redirect('/src')
});
// return content from data.json
app.get('/src/api/data', function (req, res) {
    function answer(code, data) {
        res.writeHead(code,{
            'Content-Type':'application/json;charset=utf-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'X-Requested-With'
        });
        res.end(data);
    }

    fs.readFile('./src/api/data.json', function(err, data) {
        if (err) answer(404, '');
        else answer(200, data);
    });
});


module.exports = server;

// Override: Provide an "use" used by grunt-express.
module.exports.use = function () {
    app.use.apply(app, arguments);
};
