(function () {
	angular
		.module('app.pages.info', [
			'ngRoute',
			'satellizer',
		])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/info', {
				templateUrl: 'app/pages/info/info.tpl.html',
			})
		}])
})()