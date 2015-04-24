(function () {
	'use strict';
	angular.module( 'globalProfile' )

		// Initialize Application Settings
		.config( function ( SettingsProvider ) {
			SettingsProvider.setConfig( window.globalProfile.config );
		} )

		.config( function ( $logProvider, SettingsProvider ) {
			$logProvider.debugEnabled( SettingsProvider.isDebug() );
		} )

		// Configure HTTP interceptors
		.config( function ( $httpProvider ) {
			$httpProvider.interceptors.push( 'Session' );
		} )

		// Configure States / Routes
		.config( function ( $stateProvider, $urlRouterProvider ) {

			$urlRouterProvider.otherwise( '/' );

			$stateProvider
				.state( 'default', {
					abstract:    true,
					url:         '/',
					templateUrl: 'partials/global-profile.html',
					resolve:     {
						'session': function ( $log, Session ) {
							return Session.getSession();
						},
						'systems': function ( $log, session, Ministries ) {
							return Ministries.systems().$promise;
						}
					}
				} )
				.state( 'select-ministry', {
					parent:      'default',
					url:         '',
					templateUrl: 'partials/select-ministry.html',
					controller:  'SelectMinistryController'
				} )
				.state( 'profile', {
					parent:   'default',
					abstract: true,
					url:      '{ministry_ID:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}',
					resolve:  {
						'ministry': function ( $log, $q, $state, $stateParams, session, systems ) {
							var deferred = $q.defer();
							// Unknown ministry_ID
							if ( angular.isUndefined( $stateParams.ministry_ID ) || $stateParams.ministry_ID === '' ) {
								$state.transitionTo( 'select-ministry' );
								deferred.reject();
							}
							else {
								var ministry = _.findWhere( systems, {ministry_id: $stateParams.ministry_ID} );

								// Ministry is not a valid Global Profile system
								if ( angular.isUndefined( ministry ) ) {
									$state.transitionTo( 'select-ministry' );
									deferred.reject();
								}
								else {
									deferred.resolve( ministry );
								}
							}
							return deferred.promise;
						},
						'isLeader': function ( $log, session, ministry ) {
							var flatten = function ( a, prop ) {
								var items = [];
								angular.forEach( a, function ( item ) {
									items.push( item );
									if ( item.hasOwnProperty( prop ) && angular.isArray( item[prop] ) ) {
										items = items.concat( flatten( item[prop], prop ) );
									}
								} );
								return items;
							};
							var assignments = _.where( flatten( session.assignments, 'sub_ministries' ), {ministry_id: ministry.ministry_id} ),
								roles = _.pluck( assignments, 'team_role' );
							return _.contains( roles, 'leader' ) || _.contains( roles, 'inherited_leader' );
						}
					},
					views:    {
						'title@default': {
							controller: function ( $scope, ministry ) {
								$scope.ministry = ministry;
							},
							template:   '{{ministry.name}}'
						}
					}
				} )
				.state( 'edit', {
					parent:  'profile',
					url:     '',
					resolve: {
						'profile': function ( $log, $q, session, ministry, Profile ) {
							var deferred = $q.defer();
							Profile
								.get( {
									person_id:   session.user.person_id,
									ministry_id: ministry.ministry_id
								}, function ( profile ) {
									deferred.resolve( profile );
								}, function ( response ) {
									// Profile not found for current user
									if ( response.status === 404 ) {
										// Build new profile based on session.user attributes
										var user = session.user,
											props = ['cas_username', 'key_guid', 'first_name', 'last_name', 'person_id'],
											profile = Profile.defaultProfile();
										angular.forEach( props, function ( property ) {
											// Change cas_username to email
											this[property === 'cas_username' ? 'email' : 'property'] = user.hasOwnProperty( property ) ? user[property] : '';
										}, profile );
										deferred.resolve( profile );
									}
									else {
										deferred.reject( response );
									}
								} );
							return deferred.promise;
						}
					},
					views:   {
						'@default': {
							templateUrl: 'partials/profile/edit.html',
							controller:  'EditPersonalProfileController'
						}
					}
				} )
				.state( 'admin', {
					parent:  'profile',
					url:     '/admin',
					resolve: {
						'requiresLeader': function ( $q, isLeader ) {
							var deferred = $q.defer();
							if ( isLeader ) deferred.resolve(); else deferred.reject( 'Not a Leader or Inherited Leader of the ministry.' );
							return deferred.promise;
						},
						'people':         function ( $log, ministry, Profile ) {
							return Profile.query( {ministry_id: ministry.ministry_id} ).$promise;
						}
					},
					views:   {
						'@default':      {
							templateUrl: 'partials/admin/admin.html'
						},
						'sidebar@admin': {
							templateUrl: 'partials/admin/sidebar.html',
							controller:  'SidebarController'
						}
					}
				} )
				.state( 'admin.edit', {
					url:     '/{person_ID:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}',
					resolve: {
						// person_ID must be in the list of people
						'profile': function ( $log, $q, $stateParams, people ) {
							var deferred = $q.defer();
							if ( angular.isUndefined( $stateParams.person_ID ) || $stateParams.person_ID === '' ) {
								deferred.reject( 'Missing or Invalid person_id' );
							}
							else {
								var profile = _.findWhere( people, {person_id: $stateParams.person_ID} );
								if ( angular.isUndefined( profile ) ) {
									$state.go( 'admin.new' );
									deferred.reject();
								}
								else {
									deferred.resolve( profile );
								}
							}
							return deferred.promise;
						}
					},
					views:   {
						'content@admin': {
							templateUrl: 'partials/admin/edit.html',
							controller:  'EditProfileController'
						}
					}
				} )
				.state( 'admin.add', {
					url:     '/add',
					resolve: {
						'profile': function ( $log, Profile ) {
							return Profile.defaultProfile();
						}
					},
					views:   {
						'content@admin': {
							templateUrl: 'partials/admin/add.html',
							controller:  'AddProfileController'
						}
					}
				} );
		} );
})();
