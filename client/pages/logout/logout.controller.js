(function() {
'use strict'
	angular
		.module('IFSP.App.Pages.Logout')
		.controller('LogoutController', LogoutController)

	LogoutController.$inject = ['$scope', '$location', '$auth', '$interval', 'toastr']
	function LogoutController($scope, $location, $auth, $interval, toastr) {
		var vm = this
		var interval = undefined
		vm.timer = null

		$auth
			.logout()
			.then(function() {
				toastr.info('You have been logged out')
				initRedirect(3)
			})

		$scope.$on("$destroy", function() {
			if (interval) {
				$interval.cancel(interval)
			}
		})

		function initRedirect(delay) {
			vm.timer = delay
			interval = $interval(function() {
					vm.timer -= 1
					if (vm.timer <= 0) {
						$interval.cancel(interval)
						$location.path('/')
					}
				}, 1000)
		}
	}
})()