(function () {
	'use strict';
	angular.module( 'globalProfile.controllers.admin' )
		.controller( 'EditProfileController', function ( $log, $scope, $state, profile, ministry, Profile ) {
			$scope.$state = $state;
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
})();
