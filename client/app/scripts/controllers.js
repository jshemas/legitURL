'use strict';

/* Controllers */

angular.module('legitURL').controller('HomeCtrl', ['$rootScope', '$scope', 'URL', function ($rootScope, $scope, URL) {
	$scope.showURLSuccessMessage = true;
	$scope.showURLErrorMessage = true;
	$scope.successMessage = '';
	$scope.errorMessage = '';
	$scope.createURL = function () {
		URL.createURL({
			orgURL: $scope.orgURL
		}, function (res) {
			if (res && res.success && res.success === true) {
				$scope.successMessage = 'You can now used http://localhost:8080/goto/' + res.res.url_modify + ' to reach ' + res.res.url_original;
				$scope.showURLSuccessMessage = false;
				$scope.showURLErrorMessage = true;
			} else {
				if (res && res.err){
					$scope.errorMessage = res.err[0];
				} else {
					$scope.errorMessage = 'Something went wrong, please try again.';
				}
				$scope.showURLSuccessMessage = true;
				$scope.showURLErrorMessage = false;
			}
		}, function (err) {
			$scope.errorMessage = 'Something went wrong, please try again.';
			$scope.showURLSuccessMessage = true;
			$scope.showURLErrorMessage = false;
		});
	};
}]);

angular.module('legitURL').controller('StatsCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
	URL.getURLStats($scope.modURL, function (res) {
		$scope.stats = res.res;
		//$scope.loading = false;
	}, function () {
		$rootScope.error = "Failed to fetch url stats.";
		//$scope.loading = false;
	});
}]);