(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.app', [
			// Dependencies
			'ui.router',
			'globalProfile.api.globalprofile',
            'globalProfile.components.adminNav'
		] )
		.config( function ( $stateProvider, $urlRouterProvider ) {

			$urlRouterProvider.otherwise( '/' );

			$stateProvider.state( 'app', {
				abstract:    true,
				url:         '/',
				templateUrl: 'js/states/app/app.html',
				resolve:     {
					'user':       function ( $log, User ) {
						return User.current();
					},
					'systems':    function ( $log, Ministries ) {
						return Ministries.systems().$promise;
					},
					'ministries': function ( $log, Ministries ) {
						return Ministries.ministries().$promise;
					},
					'languages':  function ( $log, Languages ) {
						return Languages.languages();
					},
					'countries':  function ( $log, Countries ) {
						return Countries.countries();
					},
                    'isSuperAdmin': function ( $log, user ) {
                        return user.superadmin;
                    }
				}
			} );
		} );

})();
