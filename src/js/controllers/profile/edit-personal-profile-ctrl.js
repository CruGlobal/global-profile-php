(function () {
	'use strict';
	angular.module( 'globalProfile.controllers.profile' )
		.controller( 'EditPersonalProfileController', function ( $log, $scope, session, ministry, profile, languages, Profile ) {
			$scope.profile = angular.copy( profile );
			$scope.languages = languages;

			$scope.resetForm = function () {
				$scope.profile = angular.copy( profile );
				$scope.profileForm.$setPristine();
			};

			$scope.saveChanges = function () {
				var method = angular.isUndefined( profile.id ) ? 'create' : 'update';
				Profile[method]( {ministry_id: ministry.ministry_id}, $scope.profile, function ( response ) {
					profile = response;
					$scope.profile = angular.copy( profile );
					$scope.profileForm.$setPristine();
				} );
			};
		} );
})();
