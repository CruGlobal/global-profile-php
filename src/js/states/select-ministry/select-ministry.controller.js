(function ( module ) {
	'use strict';

	module.controller( 'SelectMinistryController', function ( $log, $scope, $state, user, systems ) {
		$scope.$state = $state;
		$scope.ministries = systems;

		$scope.isLeader = function ( ministry_id ) {
			return _.contains( user.admin, ministry_id );
		};
	} );

})( angular.module( 'globalProfile.states.selectMinistry' ) );
