(function () {
	'use strict';
	angular.module( 'globalProfile.controllers' )
		.controller( 'SelectMinistryController', function ( $log, $scope, $state, session, systems ) {
			function flatten( a, prop ) {
				var items = [];
				angular.forEach( a, function ( item ) {
					items.push( item );
					if ( item.hasOwnProperty( prop ) && angular.isArray( item[prop] ) ) {
						items = items.concat( flatten( item[prop], prop ) );
					}
				} );
				return items;
			}

			var assignments = flatten( session.assignments, 'sub_ministries' );

			$scope.$state = $state;
			$scope.ministries = systems;

			$scope.isLeader = function ( ministry_id ) {
				var roles = _.pluck( _.where( assignments, {ministry_id: ministry_id} ), 'team_role' );
				return _.contains( roles, 'leader' ) || _.contains( roles, 'inherited_leader' );
			};
		} );
})();
