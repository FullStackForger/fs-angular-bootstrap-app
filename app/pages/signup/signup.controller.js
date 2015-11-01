(function() {
'use strict'

	angular
		.module('IFSP.App.Pages.Signup')
		.controller('SignupController', SignupController)

	SignupController.$inject = []
	function SignupController() {
		var vm = this
		vm.user = {}

	}
})();