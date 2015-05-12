(function ( module ) {
	'use strict';

	module.controller( 'EditPersonalProfileController', function ( $log, $scope, session, ministry, profile, languages, countries, Profile ) {
		$scope.profile = angular.copy( profile );
		$scope.languages = languages;
		$scope.countries = countries;

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
})( angular.module( 'globalProfile.states.profile.edit' ) );
