(function ( module ) {
	'use strict';

	module.controller( 'EditPersonalProfileController', function ( $log, $scope, $uibModal, user, ministry, profile, Profile, ministries, countries, languages, growl, gettext ) {
		$scope.profile = angular.copy( profile );
		$scope.ministries = ministries;
		$scope.countries = countries;
		$scope.languages = languages;

		console.log(ministry);
		console.log(user);

		$scope.resetForm = function () {
			$scope.profile = angular.copy( profile );
			$scope.profileForm.$setPristine();
		};

		$scope.saveChanges = function () {
			var method = angular.isUndefined( profile.id ) ? 'create' : 'update';
			Profile[method]( {ministry_id: ministry.ministry_id}, $scope.profile, function ( response ) {
				// Success
				growl.success( gettext( 'Profile successfully saved.' ) );
				profile = response;
				$scope.profile = angular.copy( profile );
				$scope.profileForm.$setPristine();
			}, function () {
				// Error
				$uibModal.open( {
					templateUrl: 'js/states/admin/error.modal.html',
					size:        'sm',
					controller:  function ( $scope, $uibModalInstance ) {
						$scope.ok = function () {
							$uibModalInstance.close();
						};
					}
				} );
			} );
		};
	} );
})( angular.module( 'globalProfile.states.profile.edit' ) );
