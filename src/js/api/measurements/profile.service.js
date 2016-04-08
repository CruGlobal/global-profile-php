(function ( module ) {
	'use strict';

	module.factory( 'Profile', function ( $log, $resource, Settings ) {
		var normalizeProfile        = function ( profile ) {
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
				angular.forEach( profile, function ( value, key ) {
					// Convert date string to Date objects
					if ( ['birth_date', 'date_joined_staff', 'date_left_staff'].indexOf( key ) != -1 ) {
						if ( angular.isString( value ) ) {
							profile[key] = moment( value ).toDate();
						}
					}
				} );
				return profile;
			},
			normalizeProfileRequest = function ( profile, headersGetter ) {
				var data = angular.copy( profile );
				angular.forEach( data, function ( value, key ) {
					if ( angular.isUndefined( value ) || value === null ) {
						delete data[key];
					}
					else if ( ['birth_date', 'date_joined_staff', 'date_left_staff'].indexOf( key ) != -1 ) {
						data[key] = moment( value ).format( 'YYYY-MM-DD' )
					}
				} );
				return angular.isObject( data ) ? angular.toJson( data ) : data;
			},
			api                     = $resource( Settings.api.measurements( '/people/:person_id' ), {
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
				create: {method: 'POST', transformRequest: normalizeProfileRequest},
				update: {method: 'PUT', transformRequest: normalizeProfileRequest}
			} );
		api.defaultProfile = function () {
			return normalizeProfile( {
				is_secure: false
			} );
		};
		return api;
	} );
})( angular.module( 'globalProfile.api.measurements' ) );
