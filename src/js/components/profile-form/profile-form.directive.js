(function ( module ) {
	'use strict';

	module
		.directive( 'profileForm', ['$log', 'Languages', 'Countries', function ( $log, Languages, Countries ) {
			var defaultRequiredFields = [
				'cas_username',
				'last_name',
				'first_name',
				'gender',
				'birth_date',
				'marital_status',
				'language',
				'mcc',
				'staff_status',
				'funding_source',
				'employment_country',
				'ministry_location_country',
				'date_joined_staff',
				'role',
				'scope'
			];
			return {
				restrict:    'E',
				require:     ['^ngModel'],
				scope:       {
					profile:        '=ngModel',
					requiredFields: '=?profileRequiredFields'
				},
				templateUrl: 'js/components/profile-form/profile-form.html',
				transclude:  true,
				link:        function ( $scope, $element, $attrs ) {

					Languages.languages().then( function ( languages ) {
						$scope.languages = languages;
					} );

					Countries.countries().then( function ( countries ) {
						$scope.countries = countries;
					} );

					$scope.showHelp = angular.isUndefined( $attrs.profileShowHelp ) ? true : $scope.$eval( $attrs.profileShowHelp ) === true;
					$scope.showPrivacy = $scope.$eval( $attrs.profileShowPrivacy ) === true;
					$scope.showLeftStaff = $scope.$eval( $attrs.profileShowLeftStaff ) === true;

					if ( angular.isUndefined( $attrs.profileRequiredFields ) ) {
						$scope.requiredFields = defaultRequiredFields;
					}

					$scope.isRequired = function ( name ) {
						return $scope.requiredFields.indexOf( name ) > -1;
					};

					$scope.$watch( 'profile.staff_status', function ( staff_status, oldVal ) {
						if( staff_status === oldVal ) return;
						if ( angular.isUndefined( staff_status ) || staff_status == 'Volunteer' || staff_status == 'Other' ) {
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

					$scope.$watch( 'profile.funding_source', function( funding_source, oldVal ) {
						if( funding_source === oldVal ) return;
						if( angular.isUndefined( funding_source ) || funding_source == 'Other' ) {
							$scope.showEmploymentCountry = false;
							$scope.requiredFields = _.without( $scope.requiredFields, 'employment_country' );
						}
						else {
							$scope.showEmploymentCountry = true;
							if ( _.indexOf( $scope.requiredFields, 'employment_country' ) === -1 ) {
								$scope.requiredFields.push( 'employment_country' );
							}
						}
					} );
				}
			}
		}] );

})( angular.module( 'globalProfile.components.profileFormDirective', [
	'globalProfile.api.measurements'
] ) );
