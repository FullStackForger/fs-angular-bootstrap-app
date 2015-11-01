(function () {
	angular
		.module('IFSP.App.Pages.Settings', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/settings', {
				templateUrl: 'pages/settings/settings.tpl.html',
			})
		}])
})()