(function () {
	angular
		.module('IFSP.App.Pages.Profile', ['ngRoute'])
		.config(['$routeProvider', function ($routeProvider) {

			$routeProvider.when('/profile', {
				templateUrl: 'pages/profile/profile.tpl.html',
				resolve: {
					loginRequired: loginRequired
				}
			})

			function loginRequired ($q, $location, $auth) {
				var deferred = $q.defer();
				if ($auth.isAuthenticated()) {
					deferred.resolve();
				} else {
					$location.path('/login');
					deferred.reject();
				}
				return deferred.promise;
			};
		}])
})()