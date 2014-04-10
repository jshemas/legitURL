'use strict';

angular.module('legitURL').factory('Auth', function ($http, $cookieStore) {
	var accessLevels = routingConfig.accessLevels,
		userRoles = routingConfig.userRoles,
		currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };
	$cookieStore.remove('user');
	function changeUser(user) {
		_.extend(currentUser, user);
	}
	return {
		authorize: function (accessLevel, role) {
			if (role === undefined) {
				role = currentUser.role;
			}
			return accessLevel.bitMask & role.bitMask;
		},
		isLoggedIn: function (user) {
			if (user === undefined) {
				user = currentUser;
			}
			return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
		},
		accessLevels: accessLevels,
		userRoles: userRoles,
		user: currentUser
	};
});

angular.module('legitURL').factory('URL', function ($http) {
	return {
		createURL: function (url, success, error) {
			$http.post('/createURL', url).success(success).error(error);
		},
		getURLStats: function (modURL, success, error) {
			$http.get('/stats/' + modURL).success(success).error(error);
		}
	};
});
