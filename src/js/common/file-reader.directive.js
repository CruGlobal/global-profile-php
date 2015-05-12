(function ( module ) {
	'use strict';

	module
		.directive( 'fileReader', [function () {
			return {
				restrict: 'A',
				scope:    {
					fileReader: '='
				},
				link:     function ( $scope, $element, $attrs ) {
					$element.on( 'change', function ( event ) {
						$scope.$apply( function () {
							$scope.fileReader = event.target.files[0];
						} );
					} );
				}
			}
		}] );

})( angular.module( 'globalProfile.common.fileReaderDirective', [] ) );
