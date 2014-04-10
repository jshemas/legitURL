'use strict';

angular.module('legitURL', ['ngCookies', 'ui.router', 'ui.bootstrap']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
	var access = routingConfig.accessLevels;

	// Public routes
	$stateProvider.state('public', {
		abstract: true,
		template: "<ui-view/>",
		data: {
			access: access.public
		}
	}).state('public.404', {
		url: '/404/',
		templateUrl: '/partials/404'
	}).state('public.home', {
		url: '/',
		templateUrl: '/partials/home',
		controller: 'HomeCtrl'
	}).state('public.stats', {
		url: '/stats/',
		templateUrl: '/partials/stats',
		controller: 'StatsCtrl'
	})

	$urlRouterProvider.otherwise('/');

	// FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
	$urlRouterProvider.rule(function ($injector, $location) {
		if ($location.protocol() === 'file') {
			return;
		}
		// Note: misnomer. This returns a query object, not a search string
		var path = $location.path(),
			search = $location.search(),
			params;
		// check to see if the path already ends in '/'
		if (path[path.length - 1] === '/') {
			return;
		}
		// If there was no search string / query params, return with a `/`
		if (Object.keys(search).length === 0) {
			return path + '/';
		}
		// Otherwise build the search string and return a `/?` prefix
		params = [];
		angular.forEach(search, function (v, k) {
			params.push(k + '=' + v);
		});
		return path + '/?' + params.join('&');
	});

	$locationProvider.html5Mode(true);

	$httpProvider.interceptors.push(function ($q, $location) {
		return {
			'responseError': function (response) {
				if (response.status === 401 || response.status === 403) {
					$location.path('/');
					return $q.reject(response);
				} else {
					return $q.reject(response);
				}
			}
		};
	});
}]).run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
	$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
		if (!Auth.authorize(toState.data.access)) {
			$rootScope.error = "Seems like you tried accessing a route you don't have access to...";
			event.preventDefault();
			if (fromState.url === '^') {
				if (Auth.isLoggedIn()) {
					$state.go('user.home');
				} else {
					$rootScope.error = null;
					$state.go('anon.login');
				}
			}
		}
	});
}]);