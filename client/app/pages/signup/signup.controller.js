(function() {
'use strict'

	angular
		.module('app.pages.signup')
		.controller('SignupController', SignupController)

	SignupController.$inject = ['$location', '$auth', 'toastr']
	function SignupController($location, $auth, toastr) {
		var vm = this

		this.user = {}
		this.signup = signup

		function signup() {
      $auth
				.signup(vm.user)
        .then(function(response) {
          $auth.setToken(response)
          $location.path('/')
          toastr.info('You have successfully created a new account and have been logged in.');
        })
        .catch(function(response) {
          toastr.error(response.data.message)
        })
    }
	}
})()