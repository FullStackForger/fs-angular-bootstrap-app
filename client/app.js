(function () {
	'use strict'
	var app = angular.module('IFSP.App', [
		// global dependecies
		'ngRoute',
		'ngAnimate',
		'satellizer',
		'toastr',
		// local depdenencies
		'app.config',
		'app.com',
		'app.pages'
	])

	app.config(['$routeProvider', '$locationProvider', '$authProvider', 'config',
		function ($routeProvider, $locationProvider, $authProvider, config) {

			console.log(config)

			// configuring authProvider
			$authProvider.baseUrl = config.apiUrl
			$authProvider.loginUrl = config.api.auth.login
			$authProvider.signupUrl = config.api.auth.signup
			$authProvider.unlinkUrl = config.api.auth.unlink
			$authProvider.facebook({
				clientId: '771579649652176'
			})


			// configuring routes
			$routeProvider.otherwise({
				redirectTo: '/home'
			})

		}])

})()