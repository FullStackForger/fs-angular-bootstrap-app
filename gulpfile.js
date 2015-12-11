'use strict'
const concat = require('gulp-concat')
const es = require('event-stream')
const gulp = require('gulp')
const ngConstant = require('gulp-ng-constant')
const argv = require('yargs').argv
const rename = require('gulp-rename')
const enviroment = argv.env || 'development'

gulp.task('config', function () {
  let scripts = gulp.src('js/*')
	let config = require(`./app/dev/config.${enviroment}.json`)
	let task = ngConstant({
		constants: { config: config },
		stream: true,
		name: 'IFSP.Config',
		indent: '',
		space: '\t',
		wrap: false
	})

	return task
		.pipe(rename('config.js'))
		.pipe(gulp.dest('app/'))
		.on('error', function (err) {
			console.error(err)
		})
})