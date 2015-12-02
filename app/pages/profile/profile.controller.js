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
		vm.getProfile()

		function getProfile() {
			account.getProfile().then(function (userData) {
				vm.user = userData.data
			}).catch(function (err) {
				console.log('profile data could not be fetched')
			})
		}

		function updateProfile() {
			account.updateProfile(user).then(function (userData) {
				vm.user = profileData
			}).catch(function (err) {
				console.log('something went wrong')
			})
		}
	}
})();