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
		<script type="application/javascript" src="bower_components/papaparse/papaparse.js"></script>
		<script type="application/javascript" src="bower_components/better-dom/dist/better-dom.min.js"></script>
		<script type="application/javascript" src="bower_components/better-i18n-plugin/dist/better-i18n-plugin.js"></script>
		<script type="application/javascript" src="bower_components/better-dateinput-polyfill/dist/better-dateinput-polyfill.js"></script>
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />

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
	<script type="application/javascript" src="js/api/measurements/measurements.module.js"></script>
	<script type="application/javascript" src="js/states/app/app.module.js"></script>
	<script type="application/javascript" src="js/states/select-ministry/select-ministry.module.js"></script>
	<script type="application/javascript" src="js/states/profile/profile.module.js"></script>
	<script type="application/javascript" src="js/states/profile/edit/edit.module.js"></script>
	<script type="application/javascript" src="js/states/admin/admin.module.js"></script>
	<script type="application/javascript" src="js/states/admin/add/add.module.js"></script>
	<script type="application/javascript" src="js/states/admin/edit/edit.module.js"></script>
	<script type="application/javascript" src="js/states/admin/import/import.module.js"></script>
	<script type="application/javascript" src="js/global-profile.module.js"></script>

	<script type="application/javascript" src="js/api/measurements/countries.service.js"></script>
	<script type="application/javascript" src="js/api/measurements/languages.service.js"></script>
	<script type="application/javascript" src="js/api/measurements/ministries.service.js"></script>
	<script type="application/javascript" src="js/api/measurements/profile.service.js"></script>
	<script type="application/javascript" src="js/api/measurements/session.service.js"></script>
	<script type="application/javascript" src="js/common/file-reader.directive.js"></script>
	<script type="application/javascript" src="js/common/offset.filter.js"></script>
	<script type="application/javascript" src="js/components/profile-form/profile-form.directive.js"></script>
	<script type="application/javascript" src="js/common/settings.service.js"></script>
	<script type="application/javascript" src="js/states/admin/add/add.controller.js"></script>
	<script type="application/javascript" src="js/states/admin/edit/edit.controller.js"></script>
	<script type="application/javascript" src="js/states/admin/import/import.controller.js"></script>
	<script type="application/javascript" src="js/states/admin/sidebar.controller.js"></script>
	<script type="application/javascript" src="js/states/profile/edit/edit.controller.js"></script>
	<script type="application/javascript" src="js/states/select-ministry/select-ministry.controller.js"></script>
	<script type="application/javascript" src="js/global-profile.config.js"></script>

	</body>
	</html>
<?php }
