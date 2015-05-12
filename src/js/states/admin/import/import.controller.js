(function ( module ) {
	'use strict';

	module
		.controller( 'ImportCSVController', function ( $log, $scope, $state, ministry, Profile ) {
			$scope.$state = $state;
			$scope.hasHeader = true;
			$scope.columns = [];
			$scope.pager = {
				page:  1,
				begin: 0
			};

			$scope.browse = function () {
				document.getElementById( 'fileBrowser' ).click();
			};

			$scope.$watch( 'file', function ( file ) {
				if ( angular.isUndefined( file ) ) return;
				parseCSV();
			} );

			$scope.$watch( 'hasHeader', function ( hasHeader ) {
				parseCSV();
			} );

			$scope.$watch( 'pager.page', function ( page ) {
				if ( angular.isUndefined( $scope.csv ) ) return;
				$scope.pager.begin = (page - 1) * 10;
			} );

			function parseCSV() {
				if ( angular.isUndefined( $scope.file ) ) return;
				if ( angular.isUndefined( $scope.hasHeader ) ) return;

				Papa.parse( $scope.file, {
					header:   false, // We remove first row manually if hasHeader is true
					complete: function ( results, file ) {
						var columns = [];
						$scope.$apply( function () {
							if ( $scope.hasHeader ) {
								$scope.headerRow = results.data.shift();
								for ( var i = 0; i < $scope.headerRow.length; i++ )
									columns.push( {index: i} );
							} else {
								delete $scope.headerRow;
								for ( var i = 0; i < results.data[0].length; i++ )
									columns.push( {index: i} );
							}
							$scope.columns = columns;
							$scope.csv = results;
						} );
					}
				} )
			}
		} );

})( angular.module( 'globalProfile.states.admin.import' ) );
