(function ( module ) {
	'use strict';

	module.factory( 'User', function ( $log, $http, Settings ) {
		return {
			current: function () {
				return $http.get( Settings.api.globalProfile( '/user' ), {
					cache: false
				} ).then( function ( response ) {
					return response.data;
				} );
			}
		};
	} );
})( angular.module( 'globalProfile.api.globalprofile' ) );
