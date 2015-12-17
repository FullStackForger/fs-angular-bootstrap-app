(function () {
	angular
		.module('app.pages.Home', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl: 'app/pages/home/home.tpl.html',
			})
		}])
})()