<?php namespace GlobalTechnology\GlobalProfile {
	$wrapper = ApplicationWrapper::singleton();
	$wrapper->logout();
	exit();
}
