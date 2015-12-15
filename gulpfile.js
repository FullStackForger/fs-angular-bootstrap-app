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

// --------------------------------
// configuration
// --------------------------------
const enviroment = argv.env || 'development'
const settings = {
	"path": {
		"build": 			"client/dist/",
		"source": 		"client/",
		"devParent": 	"client/dev/",
		"indexTpl": 	"index.tpl.html",
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

gulp.task('clean', function() {
		return gulp.src(settings.path.build, { read: false })
		.pipe(clean())
})

gulp.task('concat', ['clean'], function () {
    // gulp.src(settings.path.source)
    // .pipe(ngAnnotate())
    // .pipe(concat('app.js'))
    // .pipe(gulp.dest(settings.path.build + settings.path.scripts))

		return gulp.src(settings.scripts)
			.pipe(footer(';'))
			.pipe(concat('app.js'))
			.pipe(gulp.dest(settings.path.build))
})

gulp.task('index-dist', function () {
  var target = gulp.src(settings.path.source + 'index.html')
  var sources = gulp.src([
		//settings.path.build + '**/*.css',
		settings.path.build + '**/*.js'
	], { read: false })

  return target
		.pipe(inject(sources))
    .pipe(gulp.dest(settings.path.build))
})

gulp.task('index-dev', function () {
  var target = gulp.src(settings.path.indexTpl)
	var scripts = Array.prototype.concat(settings.scripts, settings.styles)
  var sources = gulp.src(scripts, { read: false })

  return target
		.pipe(inject(sources, {
			// gulp inject prefixes paths with '/{root_dir}'
			ignorePath: '/' + settings.path.source
		}))
		.pipe(concat(settings.path.index))
    .pipe(gulp.dest(settings.path.source))
})