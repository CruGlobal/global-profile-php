(function ( module ) {
	'use strict';

	module.provider( 'Settings', function () {
		var config = {};

		this.setConfig = function ( c ) {
			config = c;
		};

		this.isDevelopment = function () {
			return config.environment === 'development';
		};

		this.globalProfileApiBaseUrl = function () {
			return config.api['global-profile'];
		};

		this.casAuthApiBaseUrl = function () {
			return config.api['cas-auth-api'];
		};

		this.ticketUrl = function() {
			return config.api.ticket;
		};

		function apiUrl( base, path ) {
			if ( typeof path === 'undefined' ) return base;
			return ( path.indexOf( '/' ) === 0 )
				? base + path
				: base + '/' + path;
		}

		this.$get = function () {
			return {
				api:    {
					globalProfile: function ( path ) {
						return apiUrl( config.api['global-profile'], path );
					},
					casAuthApi:   function ( path ) {
						return apiUrl( config.api['cas-auth-api'], path );
					}
				},
				ticket: config.ticket
			};
		}
	} );
})( angular.module( 'globalProfile.common.settingsService', [] ) );
