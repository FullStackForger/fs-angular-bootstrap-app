(function () {
	'use strict'
	angular
		.module('IFSP.App.Pages.Signup', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/signup', {
				controller: 'SignupController as signupCtrl',
				templateUrl: 'pages/signup/signup.tpl.html',
			})
		}])
})()