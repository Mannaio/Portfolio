var express    = require('express');
var bodyParser = require('body-parser');
var globSync   = require('glob').sync;
var routes     = globSync('./routes/*.js', { cwd: __dirname }).map(require);

module.exports = function(emberCLIMiddleware) {
    var app = express();
    app.use(bodyParser());

    routes.forEach(function(route) { route(app); });
    app.use(emberCLIMiddleware);

    return app;
};