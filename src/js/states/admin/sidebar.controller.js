(function ( module ) {
	'use strict';

	module
		.controller( 'SidebarController', function ( $log, $scope, $state, people ) {
			$scope.$state = $state;
			$scope.people = people;
			$scope.filterText = '';

			$scope.clearFilter = function () {
				$scope.filterText = '';
			}
		} );

})( angular.module( 'globalProfile.states.admin' ) );
