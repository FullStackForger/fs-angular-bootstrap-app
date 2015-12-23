'use strict'
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const gulp = require('gulp')
const inject = require('gulp-inject')
const ngConstant = require('gulp-ng-constant')
const path = require('path')
const rename = require('gulp-rename')
const wiredep = require('wiredep')
const argv = require('yargs').argv
const config = {
	env: argv.env || 'development',
	base: {
		dist: 		'dist/',
		source: 	'client/',
		tmp: 			'.tmp/'
	},
	minify: argv.minify || true,
	path: {
		indexTpl: 	'index.tpl.html',			// main html file template
		index: 			'index.html',					// main html file name
		app: 				'application.js',			// compiled application file name
		libs: 			'libraries.js',				// compiled libraries file name
		styles: 		'styles.css'					// compiled styles file name
	},
	ngConfig: {
		module: 'app.config',							// compiled config module
		target: 'app.config.js'
	},
	ngTemplate: {
		module: 'IFSP.App',										// compiled template module
		target: 'app.template.js',
		sources: [
			'!index.tpl.html',
			'**/*.tpl.html'
		]
	},
	libs: [
		'vendor/angular/angular.js',
		'vendor/angular-animate/angular-animate.js',
		'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
		'vendor/angular-route/angular-route.js',
		'vendor/angular-sanitize/angular-sanitize.js',
		'vendor/satellizer/dist/satellizer.js',
		'vendor/angular-toastr/dist/angular-toastr.tpls.js'
	],
	scripts: [
		'!**/*.spec.js',
		'!vendor/**/*',
		'**/app.js',
		'**/app.config.js',
		'**/*.module.js',				// list modules first
		'**/*.js'
	],
	styles: [
		'vendor/angular-toastr/dist/angular-toastr.css',
		'stylesheets/*.css'
	]
}

gulp.task('dev:purge', function () {
	return gulp.src([
		config.base.source + config.path.index,
		config.base.source + 'app/' + config.ngConfig.target
	]).pipe(clean())
})

gulp.task('dev:config', ['dev:purge'], function () {
	let configJSON = require(path.resolve(
		process.cwd(),
		config.base.source + `/config/config.${config.env}.json`
	))
	let task = ngConstant({
		constants: { config: configJSON },
		stream: true,
		name: config.ngConfig.module,
		indent: '',
		space: '\t',
		wrap: false
	})

	return task
		.pipe(rename(config.ngConfig.target))
		.pipe(gulp.dest(config.base.source + 'app/'))
		.on('error', function (err) {
			console.error(err)
		})
})

gulp.task('dev:index', ['dev:config'], function () {
	function injectScripts(opts) {
		return inject(gulp.src(Array.prototype.concat.apply(
				config.scripts,
				config.styles
			), {
				read: false,
				cwd: config.base.source
			}), opts)
	}

	return gulp
		.src(config.path.indexTpl, { cwd: config.base.source })
		.pipe(wiredep.stream()) // https://github.com/taptapship/wiredep#gulpjs
		.pipe(injectScripts({ relative: true }))
		.pipe(concat(config.path.index))
   	.pipe(gulp.dest(config.base.source))
})


gulp.task('dev:watch', function () {
	console.log('not implemented yet')
	// regenerate configs
	// reload page (livereload)
	// run unit test
	// run jslint / jshint
})

gulp.task('default', ['dev:config', 'dev:index'])