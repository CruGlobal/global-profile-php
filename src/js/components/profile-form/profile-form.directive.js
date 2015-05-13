(function ( module ) {
	'use strict';

	module
		.directive( 'profileForm', [function () {
			return {
				restrict:    'E',
				require:     ['^ngModel'],
				scope:       {
					countries:     '=profileCountries',
					languages:     '=profileLanguages',
					showHelp:      '=?profileShowHelp',
					showLeftStaff: '=?profileShowLeftStaff',
					profile:       '=ngModel'
				},
				templateUrl: 'js/components/profile-form/profile-form.html',
				transclude:  true,
				link:        function ( $scope, $element, $attrs ) {
					if ( angular.isUndefined( $scope.showDefinitions ) ) {
						$scope.showHelp = true;
					}
					if ( angular.isUndefined( $scope.showLeftStaff ) ) {
						$scope.showLeftStaff = false;
					}
				}
			}
		}] );

})( angular.module( 'globalProfile.components.profileFormDirective', [] ) );
