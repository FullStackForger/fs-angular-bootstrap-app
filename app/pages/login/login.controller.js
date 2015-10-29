(function() {
'use strict';

	angular
		.module('IFSP.App.Pages.Login')
		.controller('LoginController', LoginController);

	LoginController.$inject = [''];
	function LoginController() {
		var vm = this;

		vm.user = {}
		vm.login = function() {
				// login user
				console.log('logging in');
		}

	}
})();