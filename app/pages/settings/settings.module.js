(function () {
	angular
		.module('IFSP.App.Pages.Settings', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {

			$routeProvider.when('/settings', {
				templateUrl: 'pages/settings/settings.tpl.html',
				resolve: {
					restrictToRegistered: restrictToRegistered
				}
			})

			function restrictToRegistered ($q, $location, $auth) {
				var deferred = $q.defer()
				if ($auth.isAuthenticated()) {
					deferred.resolve()
				} else {
					$location.path('/login')
					deferred.reject()
				}
				return deferred.promise
			}
		}])
})()