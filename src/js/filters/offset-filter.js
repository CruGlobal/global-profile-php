(function ( module ) {
	module.filter( 'offset', function () {
		return function ( input, start ) {
			if( angular.isUndefined( input ) ) return;
			start = parseInt( start, 10 );
			return input.slice( start );
		};
	} );
})( angular.module( 'globalProfile.filters' ) );
