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
				'is_secure',
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

					$scope.showHelp = $scope.$eval( $attrs.profileShowHelp ) !== false;
					$scope.showLeftStaff = $scope.$eval( $attrs.profileShowLeftStaff ) === true;

					if ( angular.isUndefined( $attrs.profileRequiredFields ) ) {
						$scope.requiredFields = defaultRequiredFields;
					}

					$scope.isRequired = function ( name ) {
						return $scope.requiredFields.indexOf( name ) > -1;
					};
				}
			}
		}] );

})( angular.module( 'globalProfile.components.profileFormDirective', [
	'globalProfile.api.measurements'
] ) );
