'use strict'
const argv = require('yargs').argv
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const es = require('event-stream')
const footer = require('gulp-footer')
const gulp = require('gulp')
const ngAnnotate = require('gulp-ng-annotate')
const ngConstant = require('gulp-ng-constant')
const rename = require('gulp-rename')

const enviroment = argv.env || 'development'
const settings = {
	"path": {
		"distParent": "./client/dist/",
		"srcParent": "./client/app/",
		"devParent": "./client/dev/",
		"scripts": [
			"!client/**/*.spec.js",
			"client/app.js",
			"client/config.js",
			"client/app/com/**/*.module.js",
			"client/app/com/**/*.js",
			"client/app/**/*.module.js",
			"client/app/**/*.js"
		],
	}
}

gulp.task('config', function () {
	let config = require(settings.path.devParent + `config.${enviroment}.json`)
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
		return gulp.src(settings.path.distParent, { read: false })
		.pipe(clean())
})

gulp.task('js', ['clean'], function () {
    // gulp.src(settings.path.srcParent)
    // .pipe(ngAnnotate())
    // .pipe(concat('app.js'))
    // .pipe(gulp.dest(settings.path.distParent + settings.path.scripts))

		return gulp.src(settings.path.scripts)
			.pipe(footer(';'))
			.pipe(concat('app.js'))
			.pipe(gulp.dest(settings.path.distParent))
})
