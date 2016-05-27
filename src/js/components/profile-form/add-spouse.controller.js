(function ( module ) {
	'use strict';

	module
		.controller( 'AddSpouseController', function ( $log, $scope, $uibModalInstance, spouse ) {
			$scope.spouse = spouse;
			$scope.toggle = {
				login: true
			};

			$scope.save = function () {
				$uibModalInstance.close( $scope.spouse );
			};

			$scope.cancel = function () {
				$uibModalInstance.dismiss( 'cancel' );
			};
		} );

})( angular.module( 'globalProfile.components.profileFormDirective' ) );
