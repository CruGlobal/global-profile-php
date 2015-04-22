(function () {
	'use strict';
	angular.module( 'globalProfile.services' )
		.provider( 'Settings', function () {
			var config = {};

			this.setConfig = function ( c ) {
				config = c;
			};

			this.isDebug = function() {
				return config.environment === 'development';
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
						measurements: function ( path ) {
							return apiUrl( config.api.measurements, path );
						}
					},
					ticket: config.ticket
				};
			}
		} );
})();
