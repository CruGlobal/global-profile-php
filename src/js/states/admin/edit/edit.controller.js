(function ( module ) {
	'use strict';

	module
		.controller( 'EditProfileController', function ( $log, $scope, $state, profile, ministry, languages, countries, Profile ) {
			$scope.$state = $state;
			$scope.languages = languages;
			$scope.countries = countries;
			$scope.profile = angular.copy( profile );

			$scope.resetForm = function () {
				$scope.profile = angular.copy( profile );
				$scope.profileForm.$setPristine();
			};

			$scope.saveChanges = function () {
				Profile.update( {ministry_id: ministry.ministry_id}, $scope.profile, function ( result ) {
					profile = result;
					$scope.profile = angular.copy( profile );
					$scope.profileForm.$setPristine();
				}, function () {
					$log.error( 'Error Saving Profile' );
				} );
			};
		} );

})( angular.module( 'globalProfile.states.admin.edit' ) );
