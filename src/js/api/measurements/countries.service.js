(function ( module ) {
	'use strict';

	module.factory( 'Countries', function ( $log, $http, Settings ) {
		return {
			countries: function () {
				return $http.get( Settings.api.measurements( '/iso_countries' ), {
					cache: true
				} ).then( function ( response ) {
					if ( angular.isArray( response.data ) ) {
						return response.data;
					}
					var countries = [];
					angular.forEach( response.data, function ( value, key ) {
						this.push( {
							iso3: key,
							name: value
						} );
					}, countries );
					return countries;
				} );
			}
		};
	} );
})( angular.module( 'globalProfile.api.measurements' ) );
