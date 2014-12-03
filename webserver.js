/*!
 * Web Server
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var express = require('express'),
    info    = require("./package.json");

//Setup Express
var app = express();

console.log('Node Server Started!');
console.log('Running Version ' + info.version);

//Static files can be served with express' static middleware.
//I usually make a directory for all static files to be served from the "public" folder.
app.use('/', express.static(__dirname + '/', { maxAge: 86400000 /*one-day*/ }));

app.configure(function(){

    //The order of which middleware are "defined" using app.use() is very important, 
    // they are invoked sequentially, thus this defines middleware precedence.        

    app.use(express.logger({ format: 'dev' }));

    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(express.compress());
    app.use(express.responseTime());

    //Handle favicon
    app.use(express.favicon());

    //Log Errors
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        next(err);
    });

});


//PROCESS
process.on('uncaughtException', function (err) {
    console.log('PROCESS: Caught exception: ' + err);
});

process.on('exit', function() {
    console.log('PROCESS: !!!!!EXITED!!!!');
});


//Kick-Start the server

app.listen(
    parseInt(info.server.port) || 5050,  //PORT
    info.server.host || "localhost" //HOSTNAME
);

console.log(['Server running at http://', info.server.host, ':', info.server.port, '/'].join(""));