(function() {
'use strict';

	angular
		.module('IFSP.App.Pages.Login')
		.controller('LoginController', LoginController)

	LoginController.$inject = ['loginService', 'toastr']
	function LoginController(loginService, toastr) {
		this.$inject = [''];

		var vm = this;

		vm.user = {}
		vm.token = undefined

		vm.login = function() {
			loginService
				.login(vm.user)
				.then(function (data) {
					vm.token = data.token
					toastr.success('Welcome back ' + data.username + '!')
				}, function (error) {
					toastr.error(error)
				})
		}

	}
})();