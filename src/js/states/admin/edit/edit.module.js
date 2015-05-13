(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.admin.edit', [
			'ui.router',
			'globalProfile.states.admin',
			'globalProfile.components.profileFormDirective'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'admin.edit', {
					url:     '/{person_ID:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}',
					resolve: {
						// person_ID must be in the list of people
						'profile': function ( $log, $q, $stateParams, people ) {
							var deferred = $q.defer();
							if ( angular.isUndefined( $stateParams.person_ID ) || $stateParams.person_ID === '' ) {
								deferred.reject( 'Missing or Invalid person_id' );
							}
							else {
								var profile = _.findWhere( people, {person_id: $stateParams.person_ID} );
								if ( angular.isUndefined( profile ) ) {
									$state.go( 'admin.new' );
									deferred.reject();
								}
								else {
									deferred.resolve( profile );
								}
							}
							return deferred.promise;
						}
					},
					views:   {
						'content@admin': {
							templateUrl: 'js/states/admin/edit/edit.html',
							controller:  'EditProfileController'
						}
					}
				} );
		} );

})();
