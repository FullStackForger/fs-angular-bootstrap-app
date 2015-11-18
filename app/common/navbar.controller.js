(function() {
'use strict';

	angular
		.module('IFSP.App.Common')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$auth'];
	function NavbarController($auth) {
			var vm = this;
			vm.isAuthenticated = function() {
				return $auth.isAuthenticated();
			};
	}
})();