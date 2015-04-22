(function () {
	'use strict';
	angular.module( 'globalProfile.services.measurements' )
		.factory( 'Ministries', function ( $log, $resource, Settings ) {
			return $resource( Settings.api.measurements( '/ministries/:ministry_id' ), {}, {
				'systems': {method: 'GET', isArray: true, params: {global_profile_only: 'true'}, cache: true},
				'query':   {method: 'GET', isArray: true}
			} );
		} );
})();
