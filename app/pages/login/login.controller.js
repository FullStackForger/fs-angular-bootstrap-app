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
		vm.login = function() {
			loginService
				.login(vm.user)
				.then(function (data) {
					toastr.success('Welcome back ' + data.username + '!')
				}, function (error) {
					toastr.error(error)
				})
		}

	}
})();