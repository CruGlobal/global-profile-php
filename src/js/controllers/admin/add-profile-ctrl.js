(function () {
	'use strict';
	angular.module( 'globalProfile.controllers.admin' )
		.controller( 'AddProfileController', function ( $log, $scope, $state ) {
			$scope.$state = $state;
		} );
})();
