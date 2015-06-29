(function ( module ) {
	'use strict';

	module
		.directive( 'profileForm', ['$log', 'Languages', 'Countries', 'Ministries', function ( $log, Languages, Countries, Ministries ) {
			var defaultRequiredFields = [
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
			return {
				restrict:    'E',
				require:     ['^ngModel'],
				scope:       {
					profile:        '=ngModel',
					requiredFields: '=?profileRequiredFields',
					ministries:     '=profileMinistries',
					languages:      '=profileLanguages',
					countries:      '=profileCountries'
				},
				templateUrl: 'js/components/profile-form/profile-form.html',
				transclude:  true,
				link:        function ( $scope, $element, $attrs ) {
					$scope.showHelp = angular.isUndefined( $attrs.profileShowHelp ) ? true : $scope.$eval( $attrs.profileShowHelp ) === true;
					$scope.showPrivacy = $scope.$eval( $attrs.profileShowPrivacy ) === true;
					$scope.showLeftStaff = $scope.$eval( $attrs.profileShowLeftStaff ) === true;

					if ( angular.isUndefined( $attrs.profileRequiredFields ) ) {
						$scope.requiredFields = defaultRequiredFields;
					}

					$scope.isRequired = function ( name ) {
						return $scope.requiredFields.indexOf( name ) > -1;
					};

					$scope.$watch( 'profile.organizational_status', function ( organizational_status, oldVal ) {
						if ( angular.isUndefined( organizational_status ) || organizational_status == 'Volunteer' || organizational_status == 'Other' ) {
							$scope.showStaffDates = false;
							$scope.requiredFields = _.without( $scope.requiredFields, 'date_joined_staff' );
						}
						else {
							$scope.showStaffDates = true;
							if ( _.indexOf( $scope.requiredFields, 'date_joined_staff' ) === -1 ) {
								$scope.requiredFields.push( 'date_joined_staff' );
							}
						}
					} );

					$scope.$watch( 'profile.organizational_status', function ( organizational_status, oldVal ) {
						if( $scope.profile.funding_source === 'Other' ) return;
						if ( angular.isUndefined( organizational_status ) || organizational_status == 'Volunteer' ) {
							$scope.showEmploymentMinistry = false;
							$scope.requiredFields = _.without( $scope.requiredFields, 'ministry_of_employment' );
						}
						else {
							$scope.showEmploymentMinistry = true;
							if ( _.indexOf( $scope.requiredFields, 'ministry_of_employment' ) === -1 ) {
								$scope.requiredFields.push( 'ministry_of_employment' );
							}
						}
					} );

					$scope.$watch( 'profile.funding_source', function ( funding_source, oldVal ) {
						if( $scope.profile.organizational_status === 'Volunteer' ) return;
						if ( angular.isUndefined( funding_source ) || funding_source == 'Other' ) {
							$scope.showEmploymentMinistry = false;
							$scope.requiredFields = _.without( $scope.requiredFields, 'ministry_of_employment' );
						}
						else {
							$scope.showEmploymentMinistry = true;
							if ( _.indexOf( $scope.requiredFields, 'ministry_of_employment' ) === -1 ) {
								$scope.requiredFields.push( 'ministry_of_employment' );
							}
						}
					} );

					$scope.formatMinistryLabel = function ( ministry_id ) {
						for ( var i = 0; i < $scope.ministries.length; i++ ) {
							if ( ministry_id === $scope.ministries[i].ministry_id ) {
								return $scope.ministries[i].area_code + ' — ' + $scope.ministries[i].name;
							}
						}
					};

					$scope.formatCountryLabel = function ( iso3 ) {
						for ( var i = 0; i < $scope.countries.length; i++ ) {
							if ( iso3 === $scope.countries[i].iso3 ) {
								return $scope.countries[i].name;
							}
						}
					};
				}
			}
		}] );

})( angular.module( 'globalProfile.components.profileFormDirective', [
	'globalProfile.api.measurements'
] ) );
