'use strict';

var gulp    = require( 'gulp' ),
	path    = require( 'path' ),
	del     = require( 'del' ),
	crypto  = require( 'crypto' ),
	url     = require( 'url' ),
	request = require( 'request' ),
	fs      = require( 'fs' );


var $ = require( 'gulp-load-plugins' )( {
	pattern: ['gulp-*']
} );

function uploadToOneSky() {
	var onesky = require( './onesky.json' ),
		ts     = Math.floor( new Date() / 1000 );

	function uploadPOTFile( file, callback ) {
		//https://github.com/onesky/api-documentation-platform/blob/master/resources/file.md#upload---upload-a-file
		request.post( {
			url:      url.format( {
				protocol: 'https',
				host:     'platform.api.onesky.io',
				pathname: '/1/projects/' + onesky.project_id + '/files',
				query:    {
					api_key:   onesky.api_key,
					timestamp: ts,
					dev_hash:  crypto.createHash( 'md5' ).update( ts + onesky.api_secret ).digest( 'hex' )
				}
			} ),
			formData: {
				file:        {
					value:   file.contents,
					options: {
						filename: file.relative
					}
				},
				file_format: 'GNU_POT'
			}
		}, function ( err, httpResponse, body ) {
			if ( err ) {
				callback( err );
			}
			callback( null, file );
		} );
	}

	return require( 'event-stream' ).map( uploadPOTFile );
}

function downloadFromOneSky( callback ) {
	var onesky = require( './onesky.json' ),
		async  = require( 'async' ),
		ts     = Math.floor( new Date() / 1000 );

	// Fetch list of project languages
	request.get( {
			url: url.format( {
				protocol: 'https',
				host:     'platform.api.onesky.io',
				pathname: '/1/projects/' + onesky.project_id + '/languages',
				query:    {
					api_key:   onesky.api_key,
					timestamp: ts,
					dev_hash:  crypto.createHash( 'md5' ).update( ts + onesky.api_secret ).digest( 'hex' )
				}
			} )
		},
		function ( error, response, body ) {
			var languages = JSON.parse( body );

			// Do not download "is_base_language" true
			// Do not download "translation_progress" 0.0%
			// Download each language that "is_ready_to_publish"
			async.each( languages.data, function ( language, cb ) {
				if ( language.is_base_language === true || language.translation_progress === '0.0%' || language.is_ready_to_publish === false ) {
					cb();
				} else {
					var ts      = Math.floor( new Date() / 1000 ),
						options = {
							url: url.format( {
								protocol: 'https',
								host:     'platform.api.onesky.io',
								pathname: '/1/projects/' + onesky.project_id + '/translations',
								query:    {
									api_key:          onesky.api_key,
									timestamp:        ts,
									dev_hash:         crypto.createHash( 'md5' ).update( ts + onesky.api_secret ).digest( 'hex' ),
									locale:           language.code,
									source_file_name: 'global-profile-app.pot',
									export_file_name: language.code + '.po'
								}
							} )
						};
					request
						.get( options )
						.pipe( fs.createWriteStream( 'src/languages/' + language.code + '.po' ).on( 'finish', cb ) )
				}
			}, callback );
		} )
}

gulp.task( 'clean', function ( callback ) {
	del( ['dist', '.tmp'], callback );
} );

gulp.task( 'html', ['clean', 'bower', 'fonts', 'partials', 'languages', 'htaccess'], function () {
	var partialsInjectFile = gulp.src( '.tmp/partials/templateCacheHtml.js', {read: false} );
	var partialsInjectOptions = {
		starttag:     '<!-- inject:partials -->',
		addPrefix:    '..',
		addRootSlash: false
	};

	var htmlFilter = $.filter( '*.html', {restore: true} );
	var jsFilter = $.filter( '**/*.js', {restore: true} );
	var cssFilter = $.filter( '**/*.css', {restore: true} );
	var notIndexFilter = $.filter( ['*', '!*.php'], {restore: true} );

	return gulp.src( 'src/*.php' )
		.pipe( $.inject( partialsInjectFile, partialsInjectOptions ) )
		.pipe( $.useref() )
		.pipe( jsFilter )
		.pipe( $.sourcemaps.init() )
		.pipe( $.ngAnnotate() )
		.pipe( $.uglify( {preserveComments: $.uglifySaveLicense} ) )
		.pipe( $.sourcemaps.write( '.' ) )
		.pipe( jsFilter.restore )
		.pipe( cssFilter )
		.pipe( $.replace( '../../bower_components/bootstrap/fonts/', '../fonts/' ) )
		.pipe( $.csso() )
		.pipe( cssFilter.restore )
		.pipe( notIndexFilter )
		.pipe( $.rev() )
		.pipe( notIndexFilter.restore )
		.pipe( $.revReplace() )
		.pipe( htmlFilter )
		.pipe( $.htmlmin( {
			removeEmptyAttributes: true
		} ) )
		.pipe( htmlFilter.restore )
		.pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'partials', function () {
	return gulp.src( ['src/**/*.html'] )
		.pipe( $.htmlmin( {
			removeEmptyAttributes: true
		} ) )
		.pipe( $.angularTemplatecache( 'templateCacheHtml.js', {
			module: 'globalProfile'
		} ) )
		.pipe( gulp.dest( '.tmp/partials/' ) );
} );

gulp.task( 'fonts', ['clean', 'bower'], function () {
	return gulp.src( ['src/bower_components/bootstrap/fonts/*'] )
		.pipe( $.filter( '**/*.{eot,svg,ttf,woff,woff2}' ) )
		.pipe( $.flatten() )
		.pipe( gulp.dest( 'dist/fonts/' ) );
} );

gulp.task( 'images', ['clean'], function () {
	return gulp.src( ['src/img/**/*.png'] )
		.pipe( gulp.dest( 'dist/img' ) );
} );

gulp.task( 'languages', ['clean'], function () {
	return gulp.src( ['src/languages/**/*.json'] )
		.pipe( gulp.dest( 'dist/languages' ) );
} );

gulp.task( 'bower', function () {
	return $.bower();
} );

gulp.task( 'build', ['images', 'html'] );

gulp.task( 'default', ['build'] );

gulp.task( 'htaccess', ['clean'], function () {
	return gulp.src( 'src/.htaccess' )
		.pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'pot', function () {
	return gulp.src( ['src/**/*.html', 'src/**/*.js'] )
		.pipe( $.angularGettext.extract( 'global-profile-app.pot', {} ) )
		.pipe( gulp.dest( 'src/languages/' ) );
} );

gulp.task( 'onesky', ['pot'], function () {
	return gulp.src( 'src/languages/global-profile-app.pot' )
		.pipe( uploadToOneSky() );
} );

gulp.task( 'download_from_onesky', function ( callback ) {
	downloadFromOneSky( callback );
} );

gulp.task( 'po', ['download_from_onesky'], function () {
	return gulp.src( 'src/languages/**/*.po' )
		.pipe( $.angularGettext.compile( {
			format: 'json'
		} ) )
		.pipe( gulp.dest( 'src/languages/' ) );
} );
