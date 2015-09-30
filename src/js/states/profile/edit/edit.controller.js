(function ( module ) {
	'use strict';

	module.controller( 'EditPersonalProfileController', function ( $log, $scope, $modal, session, ministry, profile, Profile, ministries, countries, languages, growl, gettext ) {
		$scope.profile = angular.copy( profile );
		$scope.ministries = ministries;
		$scope.countries = countries;
		$scope.languages = languages;

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
				$modal.open( {
					templateUrl: 'js/states/admin/error.modal.html',
					size:        'sm',
					controller:  function ( $scope, $modalInstance ) {
						$scope.ok = function () {
							$modalInstance.close();
						};
					}
				} );
			} );
		};
	} );
})( angular.module( 'globalProfile.states.profile.edit' ) );
