(function() {
'use strict';

	angular
		.module('app.com')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$auth'];
	function NavbarController($auth) {
			var vm = this;
			vm.isAuthenticated = function() {
				return $auth.isAuthenticated();
			};
	}
})();