<?php namespace GlobalTechnology\GlobalProfile {
	/**
	 * @param string $var
	 * @param mixed  $default
	 *
	 * @return string
	 */
	function ENV( $var, $default = '' ) {
		return array_key_exists( $var, $_SERVER ) ? $_SERVER[ $var ] : $default;
	}

	return array(
		/**
		 * Application version
		 */
		'version'       => '1.0.3',

		/**
		 * Application Name
		 */
		'name'          => ENV( 'APPLICATION_NAME', 'Global Profile' ),

		/**
		 * Application Settings
		 */
		'application'   => array(
			/**
			 * Application directory
			 *
			 * Location where where index.html, javascript, styles should be loaded from.
			 * Valid values (dist, src)
			 */
			'directory'   => ENV( 'APPLICATION_DIR', 'dist' ),

			/**
			 * Application Environment
			 *
			 * Valid values (production, staging, development)
			 */
			'environment' => ENV( 'ENVIRONMENT', 'production' ),
		),

		/**
		 * Proxy Granting Ticket Service
		 *
		 * Enable this to use the php wrapper on localhost.
		 */
		'pgtservice'    => array(
			/** @var bool Enable PGT Service */
			'enabled'  => (bool)ENV( 'PGTSERVICE_ENABLED', false ),
			/** @var string PGT Service proxy callback URL */
			'callback' => ENV( 'PGTSERVICE_CALLBACK', 'https://agapeconnect.me/casLogin.aspx' ),
			/** @var string PGT Service endpoint URL */
			'endpoint' => ENV( 'PGTSERVICE_ENDPOINT', 'https://agapeconnect.me/DesktopModules/AgapeConnect/casauth/pgtcallback.asmx/RetrievePGTCallback' ),
			/** @var string PGT Service Username */
			'username' => ENV( 'PGTSERVICE_USERNAME', '' ),
			/** @var string PGT Service Password */
			'password' => ENV( 'PGTSERVICE_PASSWORD', '' ),
		),

		/**
		 * CAS Settings
		 */
		'cas'           => array(
			/** @var string CAS hostname */
			'hostname' => 'thekey.me',
			/** @var int CAS port */
			'port'     => 443,
			/** @var string CAS context */
			'context'  => 'cas',
		),

		/**
		 * Redis Settings
		 */
		'redis'         => array(
			'hostname' => ENV( 'REDIS_PORT_6379_TCP_ADDR_SESSION', false ),
			'port'     => 6379,
			'db'       => ENV( 'REDIS_DB_INDEX', 2 ),
		),

		/**
		 * Rails CAS Auth API
		 */
		'cas-auth-api'  => array(
			/** @var string API endpoint, no training slash */
			'endpoint' => ENV( 'CAS_AUTH_API', 'https://auth-api.cru.org/v1' ),
		),

		/**
		 * Global Profile API
		 */
		'globalprofile' => array(
			'endpoint' => ENV( 'GLOBAL_PROFILE_API', 'https://profile-api.cru.org/v1' ),
		),
	);
}
