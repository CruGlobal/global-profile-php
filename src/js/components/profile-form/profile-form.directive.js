(function ( module ) {
	'use strict';

	module
		.directive( 'profileForm', [function () {
			return {
				restrict:    'E',
				require:     ['^ngModel'],
				scope:       {
					countries: '=profileCountries',
					languages: '=profileLanguages',
					profile:   '=ngModel'
				},
				templateUrl: 'js/components/profile-form/profile-form.html',
				transclude:  true,
				link:        function ( $scope, $element, $attrs ) {
					$scope.showHelp = $scope.$eval( $attrs.profileShowHelp ) !== false;
					$scope.showLeftStaff = $scope.$eval( $attrs.profileShowLeftStaff ) !== false;
				}
			}
		}] );

})( angular.module( 'globalProfile.components.profileFormDirective', [] ) );
