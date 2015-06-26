(function ( module ) {
	'use strict';

	module.factory( 'Profile', function ( $log, $resource, Settings ) {
		var normalizeProfile = function ( profile ) {
				// Language
				if ( angular.isUndefined( profile.language ) ) {
					profile.language = [];
				} else if ( angular.isString( profile.language ) ) {
					profile.language = [profile.language];
				}

				//Assignments
				if ( angular.isUndefined( profile.assignments ) ) {
					profile.assignments = [{}];
				}

				return profile;
			},
			api = $resource( Settings.api.measurements( '/people/:person_id' ), {
				person_id:   '@person_id',
				ministry_id: '@ministry_id'
			}, {
				get:    {
					method: 'GET', interceptor: {
						response: function ( response ) {
							return normalizeProfile( response.resource );
						}
					}
				},
				query:  {
					method: 'GET', isArray: true, interceptor: {
						response: function ( response ) {
							return angular.forEach( response.resource, normalizeProfile );
						}
					}
				},
				create: {method: 'POST'},
				update: {method: 'PUT'}
			} );
		api.defaultProfile = function () {
			return normalizeProfile( {
				is_secure: false
			} );
		};
		return api;
	} );
})( angular.module( 'globalProfile.api.measurements' ) );
