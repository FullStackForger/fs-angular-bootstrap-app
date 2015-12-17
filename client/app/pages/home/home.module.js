(function () {
	angular
		.module('app.pages.home', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/home', {
				templateUrl: 'app/pages/home/home.tpl.html',
			})
		}])
})()