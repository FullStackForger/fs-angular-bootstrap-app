(function () {
	var module = angular.module('app.pages.settings', [
		'ngRoute',
		'app.com'
	])

	module.config(['$routeProvider', 'resolver',
		function($routeProvider, resolver) {

		$routeProvider.when('/settings', {
			templateUrl: 'app/pages/settings/settings.tpl.html',
			resolve: {
				canAccess: resolver.allowRegisteredOnly
			}
		})
	}])
})()