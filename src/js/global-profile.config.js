(function ( module ) {
	'use strict';

	module.config( function ( $locationProvider ) {
		$locationProvider.html5Mode( true );
	} );

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

	// Configure Growl
	module.config( function ( growlProvider ) {
		growlProvider.globalPosition( 'top-right' );
		growlProvider.globalDisableCountDown( true );
		growlProvider.globalTimeToLive( {success: 10000, error: -1, warning: -1, info: 10000} );
	} );

})( angular.module( 'globalProfile' ) );
