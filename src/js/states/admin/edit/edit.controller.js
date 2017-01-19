(function ( module ) {
	'use strict';

	module
		.controller( 'EditProfileController', function ( $log, $scope, $state, profile, ministry, Profile, $uibModal, ministries, countries, languages, growl, gettext ) {
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
				'scope',
				'children.first_name',
				'children.birth_date',
				'address.line1',
				'address.city',
				'address.state',
				'address.postal_code',
				'address.country',
				'phone_number',
				'marriage_date',
				'spouse'
			];
			$scope.profile = angular.copy( profile );
			$scope.ministries = ministries;
			$scope.countries = countries;
			$scope.languages = languages;
			$scope.ministry = ministry;
			$scope.isSaving = false;

			$scope.resetForm = function () {
				$scope.profile = angular.copy( profile );
				$scope.profileForm.$setPristine();
			};

			$scope.saveChanges = function () {
				$scope.isSaving = true;
				Profile.update( {ministry_id: ministry.ministry_id}, angular.copy( $scope.profile ), function ( result ) {
					// Success
					growl.success( gettext( 'Profile successfully saved.' ) );
					profile = result;
					$scope.profile = angular.copy( profile );
					$scope.profileForm.$setPristine();
					$scope.isSaving = false;
				}, function () {
					// Error
					$uibModal.open( {
						templateUrl: 'js/states/admin/error.modal.html',
						size:        'sm',
						controller:  function ( $scope, $uibModalInstance ) {
							$scope.ok = function () {
								$uibModalInstance.close();
							};
						}
					} );
					$scope.isSaving = false;
				} );
			};

			$scope.deleteProfile = function () {
				$uibModal.open( {
						templateUrl: 'js/states/admin/confirm-delete.modal.html',
						size:        'md',
						controller:  function ( $scope, $uibModalInstance ) {
							$scope.cancel = function () {
								$uibModalInstance.close(false);
							};

							$scope.yesDeleteProfile = function () {
								$uibModalInstance.close(true);
							};
						}
					} ).result.then(function(result){
						if(result){
								$scope.isSaving = true;

								Profile.destroy( {ministry_id: ministry.ministry_id}, angular.copy( $scope.profile ), function ( result ) {
									// Success
									growl.success( gettext( 'Profile has been successfully removed.' ) );
									$state.go('admin')
									$scope.isSaving = false;
								}, function () {
									// Error
									$uibModal.open( {
										templateUrl: 'js/states/admin/error.modal.html',
										size:        'sm',
										controller:  function ( $scope, $uibModalInstance ) {
											$scope.ok = function () {
												$uibModalInstance.close();
											};
										}
									} );
									$scope.isSaving = false;
								} );
						}
					});
			};

			$scope.$on( '$stateChangeStart', function ( event, toState, toParams, fromState, fromParams ) {
				if ( $scope.profileForm.$dirty ) {
					event.preventDefault();
					$uibModal.open( {
						templateUrl: 'js/states/admin/unsaved.modal.html',
						controller:  function ( $scope, $uibModalInstance ) {
							$scope.save = function () {
								$uibModalInstance.close();
							};

							$scope.cancel = function () {
								$uibModalInstance.dismiss( 'discard' );
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

})( angular.module( 'globalProfile.states.admin.edit' ) );
