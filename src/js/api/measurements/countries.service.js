(function ( module ) {
	'use strict';

	module.factory( 'Countries', function ( $log, $http, Settings ) {
		return {
			countries: function () {
				return $http.get( Settings.api.measurements( '/iso_countries' ), {
					cache: true
				} ).then( function ( response ) {
					return response.data;
				} );
			}
		};
	} );
})( angular.module( 'globalProfile.api.measurements' ) );
