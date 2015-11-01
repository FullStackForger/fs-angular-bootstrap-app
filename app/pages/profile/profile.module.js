(function () {
	angular
		.module('IFSP.App.Pages.Profile', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/profile', {
				templateUrl: 'pages/profile/profile.tpl.html',
			})
		}])
})()