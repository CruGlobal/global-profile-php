(function ( module ) {
	'use strict';

	// Initialize Application Settings
	module.config( function ( SettingsProvider ) {
		SettingsProvider.setConfig( window.globalProfile.config );
	} );

	module.config( function ( $logProvider, SettingsProvider ) {
		$logProvider.debugEnabled( SettingsProvider.isDebug() );
	} );

	// Configure HTTP interceptors
	module.config( function ( $httpProvider ) {
		$httpProvider.interceptors.push( 'Session' );
	} );

})( angular.module( 'globalProfile' ) );
