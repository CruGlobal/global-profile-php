(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.selectMinistry', [
			'ui.router',
			'ui.bootstrap',
			'globalProfile.states.app'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'selectMinistry', {
					parent:      'app',
					url:         '',
					templateUrl: 'js/states/select-ministry/select-ministry.html',
					controller:  'SelectMinistryController'
				} );
		} );
})();
