(function () {
	'use strict';
	angular.module( 'globalProfile.controllers.profile' )
		.controller( 'EditPersonalProfileController', function ( $log, $scope, session, ministry, profile, Profile ) {
			$scope.profile = angular.copy( profile );

			$scope.resetForm = function () {
				$scope.profile = angular.copy( profile );
				$scope.profileForm.$setPristine();
			};

			$scope.saveChanges = function () {
				var method = angular.isUndefined( profile.person_id ) ? 'create' : 'update';
				Profile[method]( {ministry_id: ministry.ministry_id}, $scope.profile, function ( response ) {
				} );
			};
		} );
})();
