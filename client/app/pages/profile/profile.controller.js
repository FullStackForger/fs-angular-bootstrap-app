(function() {
'use strict';

	angular
		.module('app.pages.Profile')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['account', 'toastr'];
	function ProfileController(account, toastr) {
		var vm = this;
		vm.user = {}
		vm.getProfile = getProfile
		vm.updateProfile = updateProfile

		vm.getProfile()

		function getProfile() {
			account.getProfile().then(function (userData) {
				vm.user = userData.data
			}).catch(function (err) {
				toastr.error(err.message)
			})
		}

		function updateProfile() {
			account.updateProfile(vm.user).then(function () {
				toastr.success('Profile has been updated.')
			}).catch(function (err) {
				toastr.error(err.message)
			})
		}
	}
})();