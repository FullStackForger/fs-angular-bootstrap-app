(function () {
	angular
		.module('IFSP.App.Pages.Signup', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/signup', {
				templateUrl: 'pages/signup/signup.tpl.html',
			})
		}])
})()