/* global require, module */

var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('bower_components/moment/moment.js');
app.import('bower_components/masonry/dist/masonry.pkgd.min.js');

var fontTree = pickFiles('bower_components/font-awesome/fonts', {
    srcDir: '/',
    files: ['*'],
    destDir: '/assets/fonts'
});

module.exports = app.toTree([app.toTree(), fontTree]);
