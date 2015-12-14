(function () {
	angular
		.module('IFSP.App.Pages.Home', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl: 'app/pages/home/home.tpl.html',
			})
		}])
})()