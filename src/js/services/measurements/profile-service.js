(function () {
	'use strict';
	angular.module( 'globalProfile.services.measurements' )
		.factory( 'Profile', function ( $log, $resource, Settings ) {
			var api = $resource( Settings.api.measurements( '/people/:person_id' ), {
				person_id:   '@person_id',
				ministry_id: '@ministry_id'
			}, {
				get:    {method: 'GET'},
				query:  {method: 'GET', isArray: true},
				create: {method: 'POST'},
				update: {method: 'PUT'}
			} );
			api.defaultProfile = function() {
				return {
					is_secure: false
				}
			};
			return api;
		} );
})();
