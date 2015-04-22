<?php namespace GlobalTechnology\GlobalProfile {
	require_once( dirname( __FILE__ ) . '/../vendor/autoload.php' );
	$wrapper = ApplicationWrapper::singleton();
	$wrapper->authenticate();
	?>
	<!doctype html>
	<html ng-app="globalProfile">
	<head>
		<meta charset="UTF-8">
		<title></title>

		<!-- Application Configuration -->
		<script type="application/javascript">
			var globalProfile = window.globalProfile = window.globalProfile || {};
			globalProfile.config = <?php echo $wrapper->appConfig(); ?>;
		</script>

		<!-- 3rd Party JavaScript and CSS -->
		<script type="application/javascript" src="bower_components/jquery/dist/jquery.js"></script>
		<script type="application/javascript" src="bower_components/angular-loader/angular-loader.js"></script>
		<script type="application/javascript" src="bower_components/angular/angular.js"></script>
		<script type="application/javascript" src="bower_components/angular-resource/angular-resource.js"></script>
		<script type="application/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
		<script type="application/javascript" src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
		<script type="application/javascript" src="bower_components/moment/moment.js"></script>
		<script type="application/javascript" src="bower_components/underscore/underscore.js"></script>
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
		<!--<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.css" />-->

		<!-- Application CSS -->
		<link rel="stylesheet" href="css/global-profile.css" />
		<link rel="stylesheet" href="css/select.css" />
		<link rel="stylesheet" href="css/profile.css" />
		<link rel="stylesheet" href="css/admin.css" />
	</head>
	<body>
	<div ui-view>
		<!-- Placeholder while Angular app loads -->
		<nav class="navbar navbar-inverse navbar-fixed-top"></nav>
	</div>

	<!-- Application JavaScript -->
	<script type="application/javascript" src="js/_global-profile.js"></script>
	<script type="application/javascript" src="js/controllers/_controllers.js"></script>
	<script type="application/javascript" src="js/controllers/profile/_profile.js"></script>
	<script type="application/javascript" src="js/services/_services.js"></script>
	<script type="application/javascript" src="js/services/measurements/_measurements.js"></script>

	<script type="application/javascript" src="js/controllers/global-profile-ctrl.js"></script>
	<script type="application/javascript" src="js/controllers/select-ministry-ctrl.js"></script>
	<script type="application/javascript" src="js/controllers/profile/edit-profile-ctrl.js"></script>
	<script type="application/javascript" src="js/services/measurements/ministries-service.js"></script>
	<script type="application/javascript" src="js/services/measurements/profile-service.js"></script>
	<script type="application/javascript" src="js/services/measurements/session-service.js"></script>
	<script type="application/javascript" src="js/services/settings-service.js"></script>
	<script type="application/javascript" src="js/global-profile.js"></script>
	</body>
	</html>
<?php }
