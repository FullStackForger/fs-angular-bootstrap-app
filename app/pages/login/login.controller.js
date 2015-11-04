(function() {
'use strict';

	angular
		.module('IFSP.App.Pages.Login')
		.controller('LoginController', LoginController)

	LoginController.$inject = ['loginService']
	function LoginController(loginService) {
		this.$inject = [''];

		var vm = this;

		vm.user = {}
		vm.login = function() {
			loginService
				.login(vm.user)
				.then(function (data) {
					console.log(data)
				}, function (error) {
					console.log(error)
				})
		}

	}
})();