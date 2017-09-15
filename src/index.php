<?php namespace GlobalTechnology\GlobalProfile {
	require_once( dirname( __FILE__ ) . '/../vendor/autoload.php' );
	$wrapper = ApplicationWrapper::singleton();
	$wrapper->authenticate();
	?>
	<!doctype html>
	<html ng-app="globalProfile">
	<head>
		<meta charset="UTF-8">
		<base href="<?php echo rtrim( $wrapper->url->getPath(), '/' ) . '/'; ?>" />
		<title></title>

		<!-- Application Configuration -->
		<script type="application/javascript">
			var globalProfile = window.globalProfile = window.globalProfile || {};
			globalProfile.config = <?php echo $wrapper->appConfig(); ?>;
		</script>

		<!-- 3rd Party JavaScript and CSS -->
		<!-- build:js js/vendor.js -->
		<script type="application/javascript" src="bower_components/jquery/dist/jquery.js"></script>
		<script type="application/javascript" src="bower_components/angular-loader/angular-loader.js"></script>
		<script type="application/javascript" src="bower_components/angular/angular.js"></script>
		<script type="application/javascript" src="bower_components/angular-resource/angular-resource.js"></script>
		<script type="application/javascript" src="bower_components/angular-animate/angular-animate.js"></script>
		<script type="application/javascript" src="bower_components/angular-touch/angular-touch.js"></script>
		<script type="application/javascript" src="bower_components/angular-sanitize/angular-sanitize.js"></script>
		<script type="application/javascript" src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
		<script type="application/javascript" src="bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
		<script type="application/javascript" src="bower_components/angular-cas-auth-api/dist/cas-auth-api.js"></script>
		<script type="application/javascript" src="bower_components/moment/moment.js"></script>
		<script type="application/javascript" src="bower_components/lodash/lodash.js"></script>
		<script type="application/javascript" src="bower_components/papaparse/papaparse.js"></script>
		<script type="application/javascript" src="bower_components/angular-gettext/dist/angular-gettext.js"></script>
		<script type="application/javascript" src="bower_components/angular-growl-v2/build/angular-growl.js"></script>
		<!-- endbuild -->

		<!-- build:css styles/vendor.css-->
		<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />
		<!-- endbuild -->

		<!-- Application CSS -->
		<!-- build:css styles/app.css -->
		<link rel="stylesheet" href="bower_components/angular-growl-v2/build/angular-growl.css" />
		<link rel="stylesheet" href="css/global-profile.css" />
		<link rel="stylesheet" href="css/select.css" />
		<link rel="stylesheet" href="css/profile.css" />
		<link rel="stylesheet" href="css/admin.css" />
		<link rel="stylesheet" href="css/manage-admins.css" />
		<!-- endbuild -->
	</head>
	<body>
	<div growl></div>
	<div ui-view>
		<!-- Placeholder while Angular app loads -->
		<nav class="navbar navbar-inverse navbar-fixed-top"></nav>
	</div>

	<!-- Application JavaScript -->
	<!-- build:js js/app.js -->
	<script type="application/javascript" src="js/api/globalprofile/globalprofile.module.js"></script>
	<script type="application/javascript" src="js/states/app/app.module.js"></script>
	<script type="application/javascript" src="js/states/select-ministry/select-ministry.module.js"></script>
	<script type="application/javascript" src="js/states/profile/profile.module.js"></script>
	<script type="application/javascript" src="js/states/profile/edit/edit.module.js"></script>
	<script type="application/javascript" src="js/states/admin/admin.module.js"></script>
	<script type="application/javascript" src="js/states/admin/add/add.module.js"></script>
	<script type="application/javascript" src="js/states/admin/edit/edit.module.js"></script>
	<script type="application/javascript" src="js/states/admin/import/import.module.js"></script>
	<script type="application/javascript" src="js/states/manage-admins/manage-admins.module.js"></script>
	<script type="application/javascript" src="js/states/activate/activate.module.js"></script>
	<script type="application/javascript" src="js/global-profile.module.js"></script>

	<script type="application/javascript" src="js/api/globalprofile/countries.service.js"></script>
	<script type="application/javascript" src="js/api/globalprofile/languages.service.js"></script>
	<script type="application/javascript" src="js/api/globalprofile/ministries.service.js"></script>
	<script type="application/javascript" src="js/api/globalprofile/profile.service.js"></script>
	<script type="application/javascript" src="js/api/globalprofile/user.service.js"></script>
	<script type="application/javascript" src="js/api/globalprofile/user-roles.service.js"></script>
	<script type="application/javascript" src="js/common/file-reader.directive.js"></script>
	<script type="application/javascript" src="js/common/offset.filter.js"></script>
	<script type="application/javascript" src="js/components/profile-form/profile-form.directive.js"></script>
	<script type="application/javascript" src="js/components/profile-form/spouse.directive.js"></script>
	<script type="application/javascript" src="js/components/profile-form/add-spouse.controller.js"></script>
	<script type="application/javascript" src="js/components/admin-nav.component.js"></script>
	<script type="application/javascript" src="js/common/settings.service.js"></script>
	<script type="application/javascript" src="js/states/admin/add/add.controller.js"></script>
	<script type="application/javascript" src="js/states/admin/edit/edit.controller.js"></script>
	<script type="application/javascript" src="js/states/admin/import/import.controller.js"></script>
	<script type="application/javascript" src="js/states/admin/sidebar.controller.js"></script>
	<script type="application/javascript" src="js/states/profile/edit/edit.controller.js"></script>
	<script type="application/javascript" src="js/states/select-ministry/select-ministry.controller.js"></script>
	<script type="application/javascript" src="js/states/manage-admins/manage-admins.component.js"></script>
	<script type="application/javascript" src="js/states/activate/activate.component.js"></script>
	<script type="application/javascript" src="js/global-profile.config.js"></script>
	<script type="application/javascript" src="js/global-profile.language.js"></script>

	<!-- inject:partials -->
	<!-- angular templates will be automatically converted in js and inserted here -->
	<!-- endinject -->
	<!-- endbuild -->
	</body>
	</html>
<?php }
