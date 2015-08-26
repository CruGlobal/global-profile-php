(function ( module ) {
	'use strict';

	module.factory( 'Ministries', function ( $log, $resource, Settings ) {
		return $resource( Settings.api.measurements( '/ministries/:ministry_id' ), {}, {
			'systems': {method: 'GET', isArray: true, params: {global_profile_only: 'true'}, cache: true},
			'whq':     {method: 'GET', isArray: true, params: {whq_only: 'true', show_inactive: 'true'}, cache: true},
			'query':   {method: 'GET', isArray: true}
		} );
	} );

})( angular.module( 'globalProfile.api.measurements' ) );
