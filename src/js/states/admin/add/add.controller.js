(function ( module ) {
	'use strict';

	module
		.controller( 'AddProfileController', function ( $log, $scope, $state, profile, ministry, languages, countries, Profile ) {
			$scope.$state = $state;
			$scope.languages = languages;
			$scope.countries = countries;
			$scope.profile = angular.copy( profile );


			$scope.resetForm = function () {
				$scope.profile = angular.copy( profile );
			};

			$scope.saveProfile = function () {
				Profile.create( {ministry_id: ministry.ministry_id}, $scope.profile, function ( result ) {
					$state.go( 'admin.edit', {person_ID: result.person_id}, {reload: true} );
				}, function () {
					$log.error( 'Error Saving Profile' );
				} );
			};
		} );

})( angular.module( 'globalProfile.states.admin.add' ) );
