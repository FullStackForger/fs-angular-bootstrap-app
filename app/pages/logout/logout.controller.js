(function() {
'use strict'
	angular
		.module('IFSP.App.Pages.Logout')
		.controller('LogoutController', LogoutController)

	LogoutController.$inject = ['$location', '$auth', '$interval', 'toastr']
	function LogoutController($location, $auth, $interval, toastr) {
		var vm = this
		vm.timer = null

		// auto - log out
		console.log('logging out')

		$auth
			.logout()
			.then(function() {
				toastr.info('You have been logged out')
				initRedirect(5)
			});

		function initRedirect(delay) {
			vm.timer = delay
			var interval = $interval(function() {
					vm.timer -= 1
					if (vm.timer <= 0) {
						$interval.cancel(interval)
						$location.path('/')
					}
				}, 1000)
		}
	}
})();