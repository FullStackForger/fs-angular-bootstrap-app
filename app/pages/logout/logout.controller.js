(function() {
'use strict';

	angular
		.module('IFSP.App.Pages.Logout')
		.controller('LogoutController', LogoutController);

	LogoutController.$inject = [];
	function LogoutController() {
		var vm = this;

		// auto - log out
		console.log('logging out')
	}
})();