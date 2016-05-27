(function ( module ) {
	'use strict';

	module.controller( 'EditPersonalProfileController', function ( $log, $scope, $uibModal, user, ministry, profile, Profile, ministries, countries, languages, growl, gettext ) {
		$scope.profile = angular.copy( profile );
		$scope.ministries = ministries;
		$scope.countries = countries;
		$scope.languages = languages;
		$scope.ministry = ministry;
		$scope.isSaving = false;

		$scope.resetForm = function () {
			$scope.profile = angular.copy( profile );
			$scope.profileForm.$setPristine();
		};

		$scope.saveChanges = function () {
			$scope.isSaving = true;
			var method = angular.isUndefined( profile.id ) ? 'create' : 'update';
			Profile[method]( {ministry_id: ministry.ministry_id}, angular.copy( $scope.profile ), function ( response ) {
				// Success
				growl.success( gettext( 'Profile successfully saved.' ) );
				profile = response;
				$scope.profile = angular.copy( profile );
				$scope.profileForm.$setPristine();
				$scope.isSaving = false;
			}, function () {
				// Error
				$scope.isSaving = false;
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
