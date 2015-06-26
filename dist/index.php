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
		<script>function cdnizerLoad(u) {document.write('<scr'+'ipt src="'+encodeURIComponent(u)+'"></scr'+'ipt>');}</script><script type="application/javascript">
			var globalProfile = window.globalProfile = window.globalProfile || {};
			globalProfile.config = <?php echo $wrapper->appConfig(); ?>;
		</script>

		<!-- 3rd Party JavaScript and CSS -->
		<script type="application/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><script>if(!(window.jQuery)) cdnizerLoad("bower_components/jquery/dist/jquery.js");</script>
		<script type="application/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular-loader.min.js"></script>
		<script type="application/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular.min.js"></script><script>if(!(window.angular)) cdnizerLoad("bower_components/angular/angular.js");</script>
		<script type="application/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.28/angular-resource.min.js"></script>
		<script type="application/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.14/angular-ui-router.min.js"></script>
		<script type="application/javascript" src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.12.1/ui-bootstrap-tpls.min.js"></script>
		<script type="application/javascript" src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js"></script>
		<script type="application/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
		<script type="application/javascript" src="//cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.1/papaparse.min.js"></script>
		<!--<script type="application/javascript" src="bower_components/better-dom/dist/better-dom.min.js"></script>-->
		<!--<script type="application/javascript" src="bower_components/better-i18n-plugin/dist/better-i18n-plugin.js"></script>-->
		<!--<script type="application/javascript" src="bower_components/better-dateinput-polyfill/dist/better-dateinput-polyfill.js"></script>-->
		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.2/css/bootstrap.min.css" />

		<!-- Application CSS -->
		<link rel="stylesheet" href="css/styles.min.css?rev=625979b6">
	</head>
	<body>
	<div ui-view>
		<!-- Placeholder while Angular app loads -->
		<nav class="navbar navbar-inverse navbar-fixed-top"></nav>
	</div>

	<!-- Application JavaScript -->
	<script src="js/app.min.js?rev=8982ca20"></script>
	<script src="js/templates.min.js?rev=77f3f529"></script>

	</body>
	</html>
<?php }
