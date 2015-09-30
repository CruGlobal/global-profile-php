(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.admin', [
			'ui.router',
			'globalProfile.states.profile',
			'globalProfile.api.measurements'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'admin', {
					parent:  'profile',
					url:     '/admin',
					resolve: {
						'requiresLeader': function ( $q, isLeader, gettext ) {
							var deferred = $q.defer();
							if ( isLeader ) deferred.resolve(); else deferred.reject( gettext( 'Not a Leader or Inherited Leader of the ministry.' ) );
							return deferred.promise;
						},
						'people':         function ( $log, ministry, Profile ) {
							return Profile.query( {ministry_id: ministry.ministry_id} ).$promise;
						}
					},
					views:   {
						'@app':          {
							templateUrl: 'js/states/admin/admin.html'
						},
						'sidebar@admin': {
							templateUrl: 'js/states/admin/sidebar.html',
							controller:  'SidebarController'
						}
					}
				} )
		} );

})();
