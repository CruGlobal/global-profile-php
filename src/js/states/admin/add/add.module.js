(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.admin.add', [
			'ui.router',
			'globalProfile.states.admin',
			'globalProfile.api.measurements'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'admin.add', {
					url:     '/add',
					resolve: {
						'profile': function ( $log, Profile ) {
							return Profile.defaultProfile();
						}
					},
					views:   {
						'content@admin': {
							templateUrl: 'js/states/admin/add/add.html',
							controller:  'AddProfileController'
						}
					}
				} );
		} );

})();
