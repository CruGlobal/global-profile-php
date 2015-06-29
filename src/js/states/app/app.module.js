(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.app', [
			// Dependencies
			'ui.router',
			'globalProfile.api.measurements'
		] )
		.config( function ( $stateProvider, $urlRouterProvider ) {

			$urlRouterProvider.otherwise( '/' );

			$stateProvider.state( 'app', {
				abstract:    true,
				url:         '/',
				templateUrl: 'js/states/app/app.html',
				resolve:     {
					'session':    function ( $log, Session ) {
						return Session.getSession();
					},
					'systems':    function ( $log, session, Ministries ) {
						return Ministries.systems().$promise;
					},
					'ministries': function ( $log, session, Ministries ) {
						return Ministries.whq().$promise;
					},
					'languages':  function ( $log, session, Languages ) {
						return Languages.languages();
					},
					'countries':  function ( $log, session, Countries ) {
						return Countries.countries();
					}
				}
			} );
		} );

})();
