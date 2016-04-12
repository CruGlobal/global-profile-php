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
		public $path;

		/**
		 * Constructor
		 */
		private function __construct() {
			//Load config
			$configDir = dirname( dirname( __FILE__ ) ) . '/config';
			Config::load(
				file_exists( $configDir . '/config.php' ) ? require $configDir . '/config.php' : array(),
				require $configDir . '/defaults.php'
			);

			//Generate Current URL taking into account forwarded proto
			$url = \Net_URL2::getRequested();
			$url->setQuery( false );
			$url->setPath( dirname( $_SERVER[ 'PHP_SELF' ] ) );
			if ( isset( $_SERVER[ 'HTTP_X_FORWARDED_PROTO' ] ) )
				$url->setScheme( $_SERVER[ 'HTTP_X_FORWARDED_PROTO' ] );
			$this->url  = $url;
			$this->path = rtrim( $this->url->getPath(), '/' );

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
			else if ( false !== Config::get( 'redis.hostname', false ) ) {
				$casClient->setCallbackURL( $this->url->getURL() . '/callback.php' );

				$redis = new \Redis();
				$redis->connect( Config::get( 'redis.hostname' ), Config::get( 'redis.port', 6379 ), 2 );
				$redis->setOption( \Redis::OPT_SERIALIZER, \Redis::SERIALIZER_PHP );
				$redis->setOption( \Redis::OPT_PREFIX, Config::get( 'application.project_name' ) . ':PHPCAS_TICKET_STORAGE:' );
				$redis->select( (int)Config::get( 'redis.hostname', 2 ) );
				$casClient->setPGTStorage( new RedisTicketStorage( $casClient, $redis ) );
			}
			else {
				$casClient->setCallbackURL( $this->url->getURL() . '/callback.php' );
				$casClient->setPGTStorageFile( session_save_path() );
				// Handle logout requests but do not validate the server
				$casClient->handleLogoutRequests( false );
			}

			// Accept all proxy chains
			$casClient->getAllowedProxyChains()->allowProxyChain( new \CAS_ProxyChain_Any() );

			return $casClient;
		}

		public function getAPIServiceTicket( $service = false ) {
			return $this->casClient->retrievePT( $service ? $service : ( Config::get( 'cas-auth-api.endpoint' ) . '/token/new' ), $code, $msg );
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

		public function appConfig() {
			return json_encode( array(
				'version'     => Config::get( 'version', '' ),
				'environment' => Config::get( 'application.environment', 'production' ),
				'appUrl'      => $this->path,
				'api'         => array(
					'global-profile' => Config::get( 'globalprofile.endpoint' ),
					'cas-auth-api'   => Config::get( 'cas-auth-api.endpoint' ),
					'ticket'         => $this->url->getURL() . '/ticket.php',
					'logout'         => Config::get( 'pgtservice.enabled' )
						? $this->url->getURL() . '/logout.php'
						: $this->casClient->getServerLogoutURL(),
					'login'          => $this->casClient->getServerLoginURL(),
				),
			) );
		}
	}

}
