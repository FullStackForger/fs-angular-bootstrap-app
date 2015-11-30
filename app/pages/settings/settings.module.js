(function () {
	var module = angular.module('IFSP.App.Pages.Settings', [
		'ngRoute',
		'IFSP.App.Common'
	])

	module.config(['$routeProvider', 'resolver',
		function($routeProvider, resolver) {

		$routeProvider.when('/settings', {
			templateUrl: 'pages/settings/settings.tpl.html',
			resolve: {
				canAccess: resolver.allowRegisteredOnly
			}
		})
	}])

})()