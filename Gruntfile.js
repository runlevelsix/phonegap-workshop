// Generated on 2013-09-17 using generator-webapp 0.4.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
		// show elapsed time at the end
		require('time-grunt')(grunt);
		// load all grunt tasks
		require('load-grunt-tasks')(grunt);

		// configurable paths
		var phonegapConfig = {
				app: 'app',
				dist: 'dist'
		};

		grunt.initConfig({
				phonegap: phonegapConfig,
				watch: {
						styles: {
								files: ['<%= phonegap.app %>/styles/{,*/}*.css'],
								tasks: ['copy:styles']
						},
						livereload: {
								options: {
										livereload: '<%= connect.options.livereload %>'
								},
								files: [
										'<%= phonegap.app %>/*.html',
										'.tmp/styles/{,*/}*.css',
										'{.tmp,<%= phonegap.app %>}/scripts/{,*/}*.js',
										'<%= phonegap.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
								]
						}
				},
				connect: {
						options: {
								port: 9000,
								livereload: 35729,
								// change this to '0.0.0.0' to access the server from outside
								hostname: 'localhost'
						},
						livereload: {
								options: {
										open: true,
										base: [
												'.tmp',
												phonegapConfig.app
										]
								}
						},
						test: {
								options: {
										base: [
												'.tmp',
												'test',
												phonegapConfig.app,
										]
								}
						},
						dist: {
								options: {
										open: true,
										base: phonegapConfig.dist
								}
						}
				},
				clean: {
						dist: {
								files: [{
										dot: true,
										src: [
												'.tmp',
												'<%= phonegap.dist %>/*',
												'!<%= phonegap.dist %>/.git*'
										]
								}]
						},
						server: '.tmp'
				},
				jshint: {
						options: {
								jshintrc: '.jshintrc'
						},
						all: [
								'Gruntfile.js',
								'<%= phonegap.app %>/scripts/{,*/}*.js',
								'!<%= phonegap.app %>/scripts/vendor/*',
								'test/spec/{,*/}*.js'
						]
				},
				mocha: {
						all: {
								options: {
										run: true,
										urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
								}
						}
				},
				// not used since Uglify task does concat,
				// but still available if needed
				/*concat: {
						dist: {}
				},*/
				useminPrepare: {
						options: {
								dest: '<%= phonegap.dist %>'
						},
						html: '<%= phonegap.app %>/index.html'
				},
				usemin: {
						options: {
								dirs: ['<%= phonegap.dist %>']
						},
						html: ['<%= phonegap.dist %>/{,*/}*.html'],
						css: ['<%= phonegap.dist %>/styles/{,*/}*.css']
				},
				imagemin: {
						dist: {
								files: [{
										expand: true,
										cwd: '<%= phonegap.app %>/images',
										src: '{,*/}*.{png,jpg,jpeg}',
										dest: '<%= phonegap.dist %>/images'
								}]
						}
				},
				svgmin: {
						dist: {
								files: [{
										expand: true,
										cwd: '<%= phonegap.app %>/images',
										src: '{,*/}*.svg',
										dest: '<%= phonegap.dist %>/images'
								}]
						}
				},
				cssmin: {
						// This task is pre-configured if you do not wish to use Usemin
						// blocks for your CSS. By default, the Usemin block from your
						// `index.html` will take care of minification, e.g.
						//
						//     <!-- build:css({.tmp,app}) styles/main.css -->
						//
						// dist: {
						//     files: {
						//         '<%= phonegap.dist %>/styles/main.css': [
						//             '.tmp/styles/{,*/}*.css',
						//             '<%= phonegap.app %>/styles/{,*/}*.css'
						//         ]
						//     }
						// }
				},
				htmlmin: {
						dist: {
								options: {
										removeCommentsFromCDATA: true,
										// https://github.com/phonegap/grunt-usemin/issues/44
										//collapseWhitespace: true,
										collapseBooleanAttributes: true,
										// removeAttributeQuotes: true,
										removeRedundantAttributes: true,
										useShortDoctype: true,
										// removeEmptyAttributes: true,
										// removeOptionalTags: true
								},
								files: [{
										expand: true,
										cwd: '<%= phonegap.app %>',
										src: '*.html',
										dest: '<%= phonegap.dist %>'
								}]
						}
				},
				// Put files not handled in other tasks here
				copy: {
						dist: {
								files: [{
										expand: true,
										dot: true,
										cwd: '<%= phonegap.app %>',
										dest: '<%= phonegap.dist %>',
										src: [
												'*.{ico,png,txt}',
												'.htaccess',
												'images/{,*/}*.{webp,gif}',
												'styles/fonts/{,*/}*.*',
												'bower_components/sass-bootstrap/fonts/*.*'
										]
								}]
						},
						styles: {
								expand: true,
								dot: true,
								cwd: '<%= phonegap.app %>/styles',
								dest: '.tmp/styles/',
								src: '{,*/}*.css'
						}
				},
				concurrent: {
						server: [
								'copy:styles'
						],
						test: [
								'copy:styles'
						],
						dist: [
								'copy:styles',
								'imagemin',
								'svgmin',
								'htmlmin'
						]
				},
				bower: {
						all: {
								rjsConfig: '<%= phonegap.app %>/scripts/main.js'
						}
				}
		});

		grunt.registerTask('server', function (target) {
				if (target === 'dist') {
						return grunt.task.run(['build', 'connect:dist:keepalive']);
				}

				grunt.task.run([
						'clean:server',
						'concurrent:server',
						'connect:livereload',
						'watch'
				]);
		});

		grunt.registerTask('test', [
				'clean:server',
				'concurrent:test',
				'connect:test',
				'mocha'
		]);

		grunt.registerTask('build', [
				'clean:dist',
				'useminPrepare',
				'concurrent:dist',
				'requirejs',
				'concat',
				'cssmin',
				'uglify',
				'modernizr',
				'copy:dist',
				'rev',
				'usemin'
		]);

		grunt.registerTask('default', [
				'jshint',
				'test',
				'build'
		]);
};
