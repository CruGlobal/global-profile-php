(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.profile', [
			'ui.router',
			'globalProfile.states.app',
			'globalProfile.api.measurements'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'profile', {
					parent:   'app',
					abstract: true,
					url:      '{min_code}',
					resolve:  {
						'ministry': function ( $log, $q, $state, $stateParams, session, systems ) {
							var deferred = $q.defer();
							// Unknown min_code
							if ( angular.isUndefined( $stateParams.min_code ) || $stateParams.min_code === '' ) {
								$state.transitionTo( 'selectMinistry' );
								deferred.reject();
							}
							else {
								var ministry = _.findWhere( systems, {min_code: $stateParams.min_code} );

								// Ministry is not a valid Global Profile system
								if ( angular.isUndefined( ministry ) ) {
									$state.transitionTo( 'selectMinistry' );
									deferred.reject();
								}
								else {
									deferred.resolve( ministry );
								}
							}
							return deferred.promise;
						},
						'isLeader': function ( $log, session, ministry ) {
							var flatten = function ( a, prop ) {
								var items = [];
								angular.forEach( a, function ( item ) {
									items.push( item );
									if ( item.hasOwnProperty( prop ) && angular.isArray( item[prop] ) ) {
										items = items.concat( flatten( item[prop], prop ) );
									}
								} );
								return items;
							};
							var assignments = _.where( flatten( session.assignments, 'sub_ministries' ), {ministry_id: ministry.ministry_id} ),
								roles       = _.pluck( assignments, 'team_role' );
							return _.contains( roles, 'leader' )
								|| _.contains( roles, 'inherited_leader' )
								|| _.contains( roles, 'admin' )
								|| _.contains( roles, 'inherited_admin' );
						}
					},
					views:    {
						'title@app': {
							controller: function ( $scope, ministry ) {
								$scope.ministry = ministry;
							},
							template:   '{{ministry.name}}'
						}
					}
				} );
		} );

})();
