var _ = require('underscore'),
	path = require('path'),
	URLCtrl = require('./controllers/url'),
	userRoles = require('../client/app/scripts/routingConfig').userRoles;

var routes = [

	// Views
	{
		path: '/partials/*',
		httpMethod: 'GET',
		middleware: [function (req, res) {
			var requestedView = path.join('./', req.url);
			res.render(requestedView, {'env': process.env.NODE_ENV});
		}]
	},

	// URL resource
	{
		path: '/createURL',
		httpMethod: 'POST',
		middleware: [URLCtrl.createURL]
	},
	{
		path: '/stats/:modURL?',
		httpMethod: 'GET',
		middleware: [URLCtrl.getURLStats]
	},
	{
		path: '/goto/:modURL?',
		httpMethod: 'GET',
		middleware: [URLCtrl.goToURL]
	},

	// All other get requests should be handled by AngularJS's client-side routing system
	{
		path: '/*',
		httpMethod: 'GET',
		middleware: [function (req, res) {
			var role = userRoles.public, username = '';
			res.cookie('user', JSON.stringify({
				'username': username,
				'role': role
			}));
			res.render('index', {'env': process.env.NODE_ENV});
		}]
	}
];

module.exports = function (app) {
	_.each(routes, function (route) {
		var args = _.flatten([route.path, route.middleware]);

		switch (route.httpMethod.toUpperCase()) {
		case 'GET':
			app.get.apply(app, args);
			break;
		case 'POST':
			app.post.apply(app, args);
			break;
		case 'PUT':
			app.put.apply(app, args);
			break;
		case 'DELETE':
			app.delete.apply(app, args);
			break;
		default:
			throw new Error('Invalid HTTP method specified for route ' + route.path);
			//break; //will never get here because of throw
		}
	});
};