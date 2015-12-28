'use strict'
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const gulp = require('gulp')
const inject = require('gulp-inject')
const livereload = require('gulp-livereload');
const ngConstant = require('gulp-ng-constant')
const path = require('path')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')
const wiredep = require('wiredep')

const config = require('./config')

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

gulp.task('dev:index', indexFiles)
gulp.task('dev:index:all', ['dev:config'], indexFiles)
function indexFiles() {
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
}

gulp.task('reload', ['dev:index:all'], function () {
	livereload.reload(config.base.dist + config.path.index)
})

gulp.task('dev:watch', function () {
	livereload.listen();

	// watch scripts
	gulp.watch(config.scripts.map((script) => {
		return './' + config.base.source + script
	}), ['reload']).on('change', function (evt) {
		console.log(evt)
	})

	// watch styles
	gulp.watch(config.styles.map((script) => {
		return './' + config.base.source + script
	}), ['reload']).on('change', function(evt) {
		console.log(evt)
	})

	// watch templates
	gulp.watch(config.ngTemplate.sources.map((script) => {
		return './' + config.base.source + script
	}), ['reload']).on('change', function(evt) {
		console.log(evt)
	})
})

gulp.task('dev:serve', ['dev:watch'], function() {
  gulp.src('./' + config.base.source)
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('default', ['dev:serve'])