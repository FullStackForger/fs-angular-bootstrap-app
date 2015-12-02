(function () {
	'use strict'
	var app = angular.module('IFSP.App', [
		// global dependecies
		'ngRoute',
		'ngAnimate',
		'satellizer',
		'toastr',
		// local depdenencies
		'IFSP.App.Pages',
		'IFSP.App.Common'
	])

	app.config(['$routeProvider', '$locationProvider', '$authProvider',
		function ($routeProvider, $locationProvider, $authProvider) {

			$routeProvider.otherwise({
				redirectTo: '/home'
			})

			$authProvider.baseUrl = '/'
			$authProvider.loginUrl = '/api/auth/login'
			$authProvider.signupUrl = '/api/auth/signup'
			$authProvider.unlinkUrl = '/api/auth/unlink'

			$authProvider.facebook({
				clientId: '771579649652176'
			})
		}])

})()