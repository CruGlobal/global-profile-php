(function ( module ) {
	'use strict';

	module
		.directive( 'profileForm', ['$log', 'Languages', 'Countries', 'Ministries', function ( $log, Languages, Countries, Ministries ) {
			var defaultRequiredFields = [
				'cas_username',
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

					Ministries.query( {whq_only: 'true'}, function ( ministries ) {
						$scope.ministries = ministries;
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

					$scope.$watch( 'profile.funding_source', function ( funding_source, oldVal ) {
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
				}
			}
		}] );

})( angular.module( 'globalProfile.components.profileFormDirective', [
	'globalProfile.api.measurements'
] ) );
