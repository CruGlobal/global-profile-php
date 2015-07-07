(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.profile.edit', [
			'ui.router',
			'ui.bootstrap.modal',
			'globalProfile.states.profile',
			'globalProfile.api.measurements',
			'globalProfile.components.profileFormDirective'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
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
											props = ['key_username', 'key_guid', 'first_name', 'last_name', 'person_id'],
											profile = Profile.defaultProfile();
										angular.forEach( props, function ( property ) {
											// Change key_username to email
											this[property === 'key_username' ? 'email' : property] = user.hasOwnProperty( property ) ? user[property] : '';
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
						'@app': {
							templateUrl: 'js/states/profile/edit/edit.html',
							controller:  'EditPersonalProfileController'
						},
						'navigation@app' : {
							controller: function( $scope, isLeader ) {
								$scope.isLeader = isLeader;
							},
							template: '<button type="button" class="btn btn-sm btn-danger" ng-if="isLeader" ui-sref="admin">Administrator</button>'
						}
					}
				} )

		} );
})();
