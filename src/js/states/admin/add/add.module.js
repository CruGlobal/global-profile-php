(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.admin.add', [
			'ui.router',
			'ui.bootstrap.modal',
			'globalProfile.states.admin',
			'globalProfile.api.globalprofile',
			'globalProfile.components.profileFormDirective'
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
