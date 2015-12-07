(function() {
'use strict';

	angular
		.module('IFSP.App.Pages.Profile')
		.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['account'];
	function ProfileController(account) {
		var vm = this;
		vm.user = {}
		vm.getProfile = getProfile
		vm.updateProfile = updateProfile

		vm.getProfile()

		function getProfile() {
			account.getProfile().then(function (userData) {
				vm.user = userData.data
			}).catch(function (err) {
				console.log('profile data could not be fetched')
			})
		}

		function updateProfile() {
			account.updateProfile(vm.user).then(function () {
				console.log('user data saved')
			}).catch(function (err) {
				console.log('something went wrong')
			})
		}
	}
})();