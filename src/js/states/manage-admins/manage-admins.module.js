(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.manageAdmins', [
			'ui.router',
			'globalProfile.states.profile',
			'globalProfile.api.globalprofile'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'manageAdmins', {
					parent:  'profile',
					url:     '/manage_admins',
					resolve: {
						'requiresSuperAdmin': function ( $q, isSuperAdmin ) {
							return isSuperAdmin ? $q.resolve() : $q.reject();
						},
						'userRoles': function ( $log, ministry, UserRoles ) {
							return UserRoles.query( {ministry: ministry.min_code} ).$promise;
						}
					},
					views:   {
						'@app':          {
							template: '<manage-admins ministry="$resolve.ministry" user-roles="$resolve.userRoles"></manage-admins>'
						}
					}
				} );
		} );

})();
