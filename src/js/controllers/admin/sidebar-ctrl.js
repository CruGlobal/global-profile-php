(function () {
	'use strict';
	angular.module( 'globalProfile.controllers.admin' )
		.controller( 'SidebarController', function ( $log, $scope, $state, people ) {
			$scope.$state = $state;
			$scope.people = people;
			$scope.filterText = '';

			$scope.clearFilter = function() {
				$scope.filterText = '';
			}
		} );
})();
