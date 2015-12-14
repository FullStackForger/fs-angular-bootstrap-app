(function () {
	angular
		.module('IFSP.App.Pages.Info', [
			'ngRoute',
			'satellizer',
		])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/info', {
				templateUrl: 'app/pages/info/info.tpl.html',
			})
		}])
})()