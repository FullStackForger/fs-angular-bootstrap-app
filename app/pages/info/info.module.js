(function () {
	angular
		.module('IFSP.App.Pages.Info', [
			'ngRoute',
			'satellizer',
		])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/info', {
				templateUrl: 'pages/info/info.tpl.html',
			})
		}])
})()