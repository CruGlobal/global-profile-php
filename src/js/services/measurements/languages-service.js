(function ( module ) {
	'use strict';
	module.factory( 'Languages', function ( $log, $http, Settings ) {
		return {
			languages: function ( use_local_names ) {
				return $http.get( Settings.api.measurements( '/languages' ), {params: {'use_local_names': use_local_names === true}} ).then( function ( response ) {
					return response.data;
				} );
			}
		};
	} );
})( angular.module( 'globalProfile.services.measurements' ) );
