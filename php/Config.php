<?php namespace GlobalTechnology\GlobalProfile {

	class Config {
		private static $config = array();

		/**
		 * @param      $option
		 * @param null $default
		 *
		 * @return mixed
		 */
		public static function get( $option, $default = null ) {
			$parts = explode( '.', $option );
			$value = static::$config;
			foreach ( $parts as $part ) {
				if ( array_key_exists( $part, $value ) )
					$value = $value[ $part ];
				else
					return $default;
			}
			return $value;
		}

		public static function load( $config, $defaults = array() ) {
			static::$config = array_replace_recursive( $defaults, $config );
		}
	}

}
