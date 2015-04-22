<?php namespace GlobalTechnology\GlobalMeasurements {
	require_once( dirname( __FILE__ ) . '/vendor/autoload.php' );

	$wrapper = ApplicationWrapper::singleton();
	$wrapper->authenticate();

	if ( empty( $_GET ) ) {
		header( 'Content-Type: text/html; charset=UTF-8', true, 200 );
		echo '<html><head><title>CAS Callback Handler</title></head><body></body></html>';
		exit();
	}
}
