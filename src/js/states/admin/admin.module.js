(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.admin', [
			'ui.router',
			'globalProfile.states.profile',
			'globalProfile.api.globalprofile'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'admin', {
					parent:  'profile',
					url:     '/admin',
					resolve: {
						'requiresLeader': function ( $q, isLeader, gettext ) {
							return isLeader ? $q.resolve() : $q.reject( gettext( 'Not a Leader or Inherited Leader of the ministry.' ) );
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
