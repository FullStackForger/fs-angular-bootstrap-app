(function() {
'use strict';

	angular
		.module('IFSP.App.Pages.Login')
		.controller('LoginController', LoginController);


	function LoginController() {
		this.$inject = [''];

		var vm = this;

		vm.user = {}
		vm.login = function() {
				// login user
				console.log('logging in');
		}

	}
})();