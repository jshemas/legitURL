var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose'),
	ECT = require('ect');

var app = module.exports = express();

if (app.get('env') === 'prod') {
	app.use(express.compress());
	app.set('views', __dirname + '/dist/app/views');
	var ectRenderer = ECT({ watch: true, root: __dirname + '/dist/app/views', ext : '.html' });
	app.use(express.static(__dirname + '/dist', { maxAge: 60000 }));
} else {
	app.set('views', __dirname + '/client/app/views');
	var ectRenderer = ECT({ watch: true, root: __dirname + '/client/app/views', ext : '.html' });
	app.use(express.static(__dirname + '/client'));
}

mongoose.connect('mongodb://localhost/urls', function onMongooseError(err) {
	if (err) {
		throw err; // Log This
	}
});

app.engine('.html', ectRenderer.render);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());

require('./server/routes.js')(app);

console.log('Express server starting!');
app.listen(process.env.PORT || 8080);
