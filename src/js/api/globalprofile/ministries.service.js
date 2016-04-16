(function ( module ) {
	'use strict';

	module.factory( 'Ministries', function ( $log, $resource, Settings ) {
		return $resource( Settings.api.globalProfile( '/ministries/:ministry_id' ), {}, {
			'systems':    {method: 'GET', isArray: true, params: {global_profile_only: 'true'}, cache: true},
			'ministries': {method: 'GET', isArray: true, params: {show_inactive: 'true'}, cache: true}
		} );
	} );

})( angular.module( 'globalProfile.api.globalprofile' ) );
