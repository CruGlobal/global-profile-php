(function ( module ) {
	'use strict';

	module
		.controller( 'AddProfileController', function ( $log, $scope, $modal, $state, profile, ministry, Profile, ministries, countries, languages ) {
			$scope.$state = $state;
			$scope.requiredFields = [
				'email',
				'last_name',
				'first_name',
				'gender',
				'birth_date',
				'marital_status',
				'country_of_residence',
				'language1',
				'organizational_status',
				'funding_source',
				'date_joined_staff',
				'ministry_of_employment',
				'assignment_ministry',
				'mcc',
				'position_role',
				'scope'
			];
			$scope.profile = angular.copy( profile );
			$scope.ministries = ministries;
			$scope.countries = countries;
			$scope.languages = languages;

			$scope.resetForm = function () {
				$scope.profile = angular.copy( profile );
			};

			$scope.saveProfile = function () {
				Profile.create( {ministry_id: ministry.ministry_id}, $scope.profile, function ( result ) {
					$scope.profileForm.$setPristine();
					$state.go( 'admin.edit', {person_ID: result.person_id}, {reload: true} );
				}, function () {
					$modal.open( {
						templateUrl: 'js/states/admin/error.modal.html',
						size:        'sm',
						controller:  function ( $scope, $modalInstance ) {
							$scope.ok = function () {
								$modalInstance.close();
							};
						}
					} );
				} );
			};

			$scope.$on( '$stateChangeStart', function ( event, toState, toParams, fromState, fromParams ) {
				if ( $scope.profileForm.$dirty ) {
					event.preventDefault();
					$modal.open( {
						templateUrl: 'js/states/admin/unsaved.modal.html',
						controller:  function ( $scope, $modalInstance ) {
							$scope.save = function () {
								$modalInstance.close();
							};

							$scope.cancel = function () {
								$modalInstance.dismiss( 'discard' );
							};
						}
					} ).result.then( function () {
						}, function ( action ) {
							if ( action === 'discard' ) {
								$scope.profileForm.$setPristine();
								$state.transitionTo( toState, toParams );
							}
						} );
				}
			} );

		} );

})( angular.module( 'globalProfile.states.admin.add' ) );
