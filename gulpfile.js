'use strict'
// ------------------------------------------
// https://github.com/jbouzekri/angular-gulp-skeleton
// ---------------------------------------------------

const argv = require('yargs').argv
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const es = require('event-stream')
const footer = require('gulp-footer')
const gulp = require('gulp')
const inject = require('gulp-inject')
const ngAnnotate = require('gulp-ng-annotate')
const ngConstant = require('gulp-ng-constant')
const rename = require('gulp-rename')
const wiredep = require('wiredep').stream // https://github.com/taptapship/wiredep#gulpjs

// --------------------------------
// configuration
// --------------------------------
const enviroment = argv.env || 'development'
const settings = {
	"path": {
		"temp": 			"client/.tmp/",
		"build": 			"client/dist/",
		"source": 		"client/",
		"devParent": 	"client/dev/",
		"templates":	"app.templates.js",
		"indexTpl": 	"client/index.tpl.html",
		"index": 			"index.html"
	},
	"scripts": [
		"!client/**/*.spec.js",
		"client/app.js",
		"client/config.js",
		"client/app/com/**/*.module.js",
		"client/app/com/**/*.js",
		"client/app/**/*.module.js",
		"client/app/**/*.js"
	],
	"styles": [
		"client/stylesheets/*.css"
	],
	"templates": [
		"client/**/*.tpl.html"
	]
}

// --------------------------------
// tasks
// --------------------------------

gulp.task('config', function () {
	let config = require('./' + settings.path.devParent + `config.${enviroment}.json`)
	let task = ngConstant({
		constants: { config: config },
		stream: true,
		name: 'app.config',
		indent: '',
		space: '\t',
		wrap: false
	})

	return task
		.pipe(rename('config.js'))
		.pipe(gulp.dest('client/'))
		.on('error', function (err) {
			console.error(err)
		})
})


gulp.task('purge', function() {
		return gulp.src(settings.path.source + settings.path.index, { read: false })
			.pipe(clean())
})

gulp.task('purge:dist', function() {
		return gulp.src(settings.path.build, { read: false })
			.pipe(clean())
})

gulp.task('purge:tmp', function () {
	return gulp.src(settings.path.temp, {read: false})
		.pipe(clean())
})

gulp.task('templates:dist', ['purge:tmp'], function () {
  return gulp.src(settings.templates)
    .pipe(templateCache({
			module: 'app'
		}))
		.pipe(concat(settings.path.templates))
    .pipe(gulp.dest(settings.path.temp))
});

gulp.task('concat:dist', ['purge:dist', 'templates:dist'], function () {
		return gulp.src(Array.prototype.concat(
				settings.scripts,
				settings.path.temp + settings.path.templates // add templates
			))
			.pipe(footer(';'))
			.pipe(concat('app.js'))
			.pipe(gulp.dest(settings.path.build))
})

gulp.task('index:dist', ['concat:dist'], function () {
  var target = gulp.src(settings.path.source + 'index.html')
  var sources = gulp.src([
		settings.path.build + '**/*.css',
		settings.path.build + '**/*.js'
	], { read: false })

  return target
		.pipe(inject(sources, {
			// gulp inject prefixes paths with '/{root_dir}'
			ignorePath: '/' + settings.path.build
		}))
		.pipe(concat(settings.path.index))
   	.pipe(gulp.dest(settings.path.build))
})

gulp.task('index', ['purge'], function () {
	var libs = Array.prototype.concat(settings.scripts, settings.styles)
	gulp
		.src(settings.path.indexTpl)
		.pipe(wiredep())
		.pipe(inject(gulp.src(libs, { read: false }), {
			ignorePath: '/' + settings.path.source 	// gulp inject prefixes paths with '/{root_dir}'
		}))
		.pipe(concat(settings.path.index))
   	.pipe(gulp.dest(settings.path.source))
})

var templateCache = require('gulp-angular-templatecache');

gulp.task('default', ['config', 'index'])