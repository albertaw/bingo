var express = require('express');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(serveIndex(__dirname + '/public'))

app.listen(app.get('port'), function () {
	console.log('app running on port', app.get('port'));
});