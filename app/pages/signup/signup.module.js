(function () {
	angular
		.module('IFSP.App.Pages.Signup', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/signup', {
				controller: 'SignupController',
				controllerAs: 'signupCtrl',
				templateUrl: 'pages/signup/signup.tpl.html',
			})
		}])
})()