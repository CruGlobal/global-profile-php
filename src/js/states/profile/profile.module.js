(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.profile', [
			'ui.router',
			'globalProfile.states.app',
			'globalProfile.api.globalprofile'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'profile', {
					parent:   'app',
					abstract: true,
					url:      '{min_code}',
					resolve:  {
						'ministry': function ( $log, $q, $state, $stateParams, systems ) {
							var deferred = $q.defer();
							// Unknown min_code
							if ( angular.isUndefined( $stateParams.min_code ) || $stateParams.min_code === '' ) {
								$state.transitionTo( 'selectMinistry' );
								deferred.reject();
							}
							else {
								var ministry = _.find( systems, {min_code: $stateParams.min_code} );

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
						'isLeader': function ( $log, user, ministry ) {
							return user.superadmin || _.includes( user.admin, ministry.ministry_id );
						},
						'isSuperAdmin': function ( $log, user ) {
							return user.superadmin;
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
