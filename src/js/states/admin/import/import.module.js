(function () {
	'use strict';

	angular
		.module( 'globalProfile.states.admin.import', [
			'ui.router',
			'globalProfile.states.admin',
			'globalProfile.common.fileReaderDirective',
			'globalProfile.common.offsetFilter'
		] )
		.config( function ( $stateProvider ) {
			$stateProvider
				.state( 'admin.import', {
					url:     '/import',
					resolve: {},
					views:   {
						'@app': {
							templateUrl: 'js/states/admin/import/import.html',
							controller:  'ImportCSVController'
						}
					}
				} );
		} );

})();
