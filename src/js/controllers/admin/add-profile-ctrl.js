(function () {
	'use strict';
	angular.module( 'globalProfile.controllers.admin' )
		.controller( 'AddProfileController', function ( $log, $scope, $state, profile, ministry, languages, Profile ) {
			$scope.$state = $state;
			$scope.languages = languages;
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
})();
