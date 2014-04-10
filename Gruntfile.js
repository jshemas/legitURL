'use strict';

module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		// backend linter
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			appfile: {
				src: 'app.js'
			},
			server: {
				src: ['server/*.js']
			},
			serverModels: {
				src: ['server/models/*.js']
			},
			serverControllers: {
				src: ['server/controllers/*.js']
			}
		},
		// mocha tests (server)
		mochaTest: {
			testIndex: {
				options: {
					reporter: 'progress',
					bail: true
				},
				src: ['server/tests/index.spec.js']
			},
			testURL: {
				options: {
					reporter: 'progress',
					bail: true
				},
				src: ['server/tests/url.spec.js']
			}
		},
		// protractor e2e tests (client)
		protractor: {
			options: {
				configFile: "node_modules/protractor/referenceConf.js",
				keepAlive: true,
				noColor: false,
				args: {}
			},
			e2e: {
				options: {
					configFile: "client/conf/e2e.conf.js",
					args: {}
				}
			}
		},
		// move files from client and into dist
		copy: {
			dist: {
				cwd: 'client/app',
				src: [ '**' ],
				dest: 'dist/app',
				expand: true
			},
		},
		// clean(deletes) the dist folder
		clean: {
			dist: {
				src: [ 'dist/app' ]
			},
			styles: {
				src: [ 'dist/app/styles/*.css', '!dist/app/styles/app.css' ]
			},
			scripts: {
				src: [ 'dist/app/scripts/*.js', '!dist/app/scripts/app.js' ]
			}
		},
		// minifies CSS
		cssmin: {
			dist: {
				files: {
					'dist/app/styles/app.css': [ 'client/app/styles/*.css' ]
				}
			}
		},
		// minifies JS
		uglify: {
			dist: {
				options: {
					mangle: false
				},
				files: {
					'dist/app/scripts/app.js': [ 'client/app/scripts/*.js' ]
				}
			}
		},
		// express deploy
		express: {
			options: {
				port: 8080
			},
			dev: {
				options: {
					script: './app.js',
					node_env: 'dev',
					nospawn: true,
					delay: 5
				}
			},
			prod: {
				options: {
					script: './app.js',
					node_env: 'prod',
					background: false,
					delay: 5
				}
			}
		},
		// live watcher for file changes
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile']
			},
			server: {
				files: 'server/*.js',
				tasks: ['jshint:server', 'mochaTest:testGen']
			},
			serverTests: {
				files: 'server/tests/server/*.js',
				tasks: ['jshint:serverTests', 'mochaTest:testGen']
			},
			serverModels: {
				files: 'server/models/*.js',
				tasks: ['jshint:serverModels', 'mochaTest:testGen']
			},
			serverControllers: {
				files: 'server/controllers/*.js',
				tasks: ['jshint:serverControllers', 'mochaTest:testGen']
			},
			protractor: {
				files: ['client/tests/e2e/*.js', 'client/conf/*.js', 'client/app/lib/*.js', 'client/app/scripts/*.js', 'client/app/styles/*.css', 'client/app/views/*.html', 'client/app/views/partials/*.html'],
				tasks: ['protractor:e2e']
			},
			express: {
				files:  [ 'server/*.js' ],
				tasks:  [ 'express:dev' ],
				options: {
					nospawn: true
				}
			}
		}
	});
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-protractor-runner');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Tasks.
	grunt.registerTask('default', ['jshint', 'mochaTest:testIndex', 'mochaTest:testURL']);
	grunt.registerTask('dev', ['express:dev', 'watch']);
	grunt.registerTask('prod', ['build', 'express:prod']);
	grunt.registerTask('build', ['clean:dist', 'copy', 'cssmin', 'uglify', 'clean:styles', 'clean:scripts']);
	grunt.registerTask('testserver', 'run backend tests', function () {
		var tasks = ['jshint', 'mochaTest:testGen', 'watch'];
		// always use force when watching, this will rerun tests if they fail
		grunt.option('force', true);
		grunt.task.run(tasks);
	});
	grunt.registerTask('teste2e', ['protractor:e2e', 'watch']);
};