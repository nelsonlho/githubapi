var jsdom = require('jsdom');
require('babel-core/register');
global.document = jsdom.jsdom('<!doctype html><html><body> <div id="app"></div></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};


//Set React global only after setting document, window
var React = require('react');
global.React = React;
