(function ( module ) {
	'use strict';

	module.factory( 'Languages', function ( $log, $http, Settings ) {
		return {
			languages: function () {
				return $http.get( Settings.api.globalProfile( '/languages' ), {
					cache: true
				} ).then( function ( response ) {
					return response.data;
				} );
			}
		};
	} );
})( angular.module( 'globalProfile.api.globalprofile' ) );
