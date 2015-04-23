(function () {
	'use strict';
	angular.module( 'globalProfile.controllers.admin' )
		.controller( 'EditProfileController', function ( $log, $scope, $state, profile ) {
			$scope.$state = $state;
			$scope.profile = profile;
		} );
})();
