(function ( module ) {
	'use strict';

	module
		.directive( 'spouse', ['$log', '$uibModal', 'Profile', function ( $log, $uibModal, Profile ) {
			return {
				restrict:    'E',
				require:     ['^ngModel', '^form'],
				scope:       {
					'showSpouseSelector': '=',
					'currentMinistry':    '='
				},
				templateUrl: 'js/components/profile-form/spouse.html',
				transclude:  true,
				link:        function ( $scope, $element, $attrs, $ctrls ) {
					var ngModel    = $ctrls[0],
						parentForm = $ctrls[1];

					// Isolate our form from the parent by removing it
					parentForm.$removeControl( $scope.spouseForm );

					// Spouse state
					$scope.viewState = '';
					$scope.ngModel = ngModel;

					if ( $scope.showSpouseSelector ) {
						$scope.people = Profile.query( {ministry_id: $scope.currentMinistry.ministry_id} )
					}

					ngModel.$render = function () {
						$scope.spouse = ngModel.$viewValue;
						if ( angular.isUndefined( $scope.spouse ) ) {
							$scope.spouse = {spouse_id: undefined};
						}
					};

					$scope.$watch( 'spouse.spouse_id', function ( spouse_id, old_spouse_id ) {
						if ( spouse_id === old_spouse_id ) return;
						var spouse = _.find( $scope.people, {person_id: spouse_id} );
						if ( angular.isDefined( spouse ) ) {
							ngModel.$setViewValue( {
								spouse_id:  spouse.person_id,
								first_name: spouse.first_name,
								last_name:  spouse.last_name
							} );
							ngModel.$render();
						}
					} );

					$scope.addSpouse = function () {
						$uibModal.open( {
							backdrop:    'static',
							keyboard:    false,
							templateUrl: 'js/components/profile-form/add-spouse.modal.html',
							controller:  'AddSpouseController',
							scope:       $scope.$new( true ),
							resolve:     {
								'spouse': function () {
									return angular.copy( $scope.spouse );
								}
							}
						} ).result.then( function ( spouse ) { /* success */
							ngModel.$setViewValue( angular.copy( spouse ) );
							ngModel.$render();
						}, function () { /* canceled */
						} );
					};

					$scope.removeSpouse = function () {
						ngModel.$setViewValue( {} );
						ngModel.$render();
					};

					$scope.spouseFormatter = function ( s ) {
						return s.last_name + ', ' + s.first_name;
					};

					ngModel.$validators.spouse = function ( modelValue, viewValue ) {
						if ( angular.isDefined( modelValue ) && modelValue !== null ) {
							if ( angular.isDefined( modelValue.spouse_id ) && modelValue.spouse_id !== '' ) {
								$scope.viewState = 'personal';
								return true;
							}
							else if ( angular.isDefined( modelValue.key_username ) && modelValue.key_username !== '' ) {
								$scope.viewState = 'username';
								return true;
							}
							else if ( angular.isDefined( modelValue.first_name ) &&
								angular.isDefined( modelValue.last_name ) &&
								angular.isDefined( modelValue.email ) ) {
								$scope.viewState = 'personal';
								return true;
							}
						}

						$scope.viewState = '';
						return false;
					};

					ngModel.$isEmpty = function ( modelValue ) {
						if ( angular.isDefined( modelValue ) ) {
							if ( angular.isDefined( modelValue.spouse_id ) && modelValue.spouse_id !== '' ) {
								return false;
							}
							else if ( angular.isDefined( modelValue.key_username ) && modelValue.key_username !== '' ) {
								return false;
							}
							else if ( angular.isDefined( modelValue.first_name ) &&
								angular.isDefined( modelValue.last_name ) &&
								angular.isDefined( modelValue.email ) ) {
								return false;
							}
						}
						return true;
					}
				}
			}
		}] )

})( angular.module( 'globalProfile.components.profileFormDirective' ) );
