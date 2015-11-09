module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
		files: [
			// dependencies
			'app/vendor/angular/angular.js',
			'app/vendor/angular-route/angular-route.js',
			'app/vendor/angular-mocks/angular-mocks.js',
					//'app/vendor/angular-sanitize/angular-sanitize.js',
					//'app/vendor/angular-bootstrap/ui-bootstrap.js',
					//'app/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
			// app modules
			'app/app.js',
			'app/pages/**/*.module.js', // load module definitions first
			'app/pages/**/*.js',
			// templates
			//'app/modules/**/*.tpl.html'
		],

    // list of files to exclude
		exclude: [
			'app/**/*.annotated.js',
		],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
