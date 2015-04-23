<?php namespace GlobalTechnology\GlobalProfile {

	// Require phpCAS, composer does not autoload it.
	require_once( dirname( dirname( __FILE__ ) ) . '/vendor/jasig/phpcas/source/CAS.php' );

	class ApplicationWrapper {
		/**
		 * Singleton instance
		 * @var ApplicationWrapper
		 */
		private static $instance;

		/**
		 * Returns the Plugin singleton
		 * @return ApplicationWrapper
		 */
		public static function singleton() {
			if ( ! isset( self::$instance ) ) {
				$class          = __CLASS__;
				self::$instance = new $class();
			}
			return self::$instance;
		}

		/**
		 * Prevent cloning of the class
		 * @internal
		 */
		private function __clone() {
		}

		public $casClient;
		public $url;

		/**
		 * Constructor
		 */
		private function __construct() {
			//Load config
			$configDir = dirname( dirname( __FILE__ ) ) . '/config';
			Config::load( require $configDir . '/config.php', require $configDir . '/defaults.php' );

			//Generate Current URL taking into account forwarded proto
			$url = \Net_URL2::getRequested();
			$url->setQuery( false );
			if ( $this->endswith( $url->getPath(), '.php' ) )
				$url->setPath( dirname( $url->getPath() ) );
			if ( isset( $_SERVER[ 'HTTP_X_FORWARDED_PROTO' ] ) )
				$url->setScheme( $_SERVER[ 'HTTP_X_FORWARDED_PROTO' ] );
			$this->url = $url;

			// Initialize phpCAS proxy client
			$this->casClient = $this->initializeCAS();
		}

		private function initializeCAS() {
			$casClient = new \CAS_Client(
				CAS_VERSION_2_0,
				true,
				Config::get( 'cas.hostname' ),
				Config::get( 'cas.port' ),
				Config::get( 'cas.context' )
			);
			$casClient->setNoCasServerValidation();

			if ( true === Config::get( 'pgtservice.enabled', false ) ) {
				$casClient->setCallbackURL( Config::get( 'pgtservice.callback' ) );
				$casClient->setPGTStorage( new ProxyTicketServiceStorage( $casClient ) );
			}
			else {
				$casClient->setCallbackURL( $this->url->resolve( 'callback.php' )->getURL() );
				$casClient->setPGTStorageFile( session_save_path() );
				// Handle logout requests but do not validate the server
				$casClient->handleLogoutRequests( false );
			}

			// Accept all proxy chains
			$casClient->getAllowedProxyChains()->allowProxyChain( new \CAS_ProxyChain_Any() );

			return $casClient;
		}

		public function getAPIServiceTicket() {
			return $this->casClient->retrievePT( Config::get( 'measurements.endpoint' ) . '/token', $code, $msg );
		}

		public function versionUrl( $url ) {
			$version = Config::get( 'version', false );
			if ( $version ) {
				$url = new \Net_URL2( $url );
				$url->setQueryVariable( 'ver', $version );
				return $url->getURL();
			}
			return $url;
		}

		public function authenticate() {
			$this->casClient->forceAuthentication();
		}

		public function logout() {
			$this->casClient->logout( array() );
		}

		public function appDir( $path = '' ) {
			$url = $this->url->resolve( 'app/' . Config::get( 'application.directory', 'dist' ) . '/' . ltrim( $path, '/' ) );
			$url->setQueryVariable( 'ver', Config::get( 'version', 'false' ) );
			return $url->getURL();
		}

		public function appConfig() {
			return json_encode( array(
				'version'     => Config::get( 'version', '' ),
				'ticket'      => $this->getAPIServiceTicket(),
				'appUrl'      => $this->url->resolve( 'app' )->getPath(),
				'api'         => array(
					'measurements' => Config::get( 'measurements.endpoint' ),
					'refresh'      => $this->url->resolve( 'refresh.php' )->getPath(),
					'logout'       => Config::get( 'pgtservice.enabled' )
						? $this->url->resolve( 'logout.php' )->getPath()
						: $this->casClient->getServerLogoutURL(),
					'login'        => $this->casClient->getServerLoginURL(),
				),
				'namespace'   => Config::get( 'measurements.namespace' ),
				'tabs'        => Config::get( 'tabs', array() ),
				'environment' => Config::get( 'application.environment', 'production' ),
			) );
		}

		private function endswith( $string, $test ) {
			$strlen  = strlen( $string );
			$testlen = strlen( $test );
			if ( $testlen > $strlen ) return false;
			return substr_compare( $string, $test, $strlen - $testlen, $testlen ) === 0;
		}
	}

}
