'use strict'
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const gulp = require('gulp')
const inject = require('gulp-inject')
const rename = require('gulp-rename')
const ngAnnotate = require('gulp-ng-annotate')
const ngTemplateCache = require('gulp-angular-templatecache')
const uglify = require('gulp-uglify')

const config = require('./config.js')

// -----------------------------------------------
// - utitlities
// -----------------------------------------------

gulp.task('dist:purge', function () {
	return gulp.src([
		config.base.tmp,
		config.base.dist
	], {
		read: false
	}).pipe(clean())
})

gulp.task('dist:templates', ['dist:purge'], function () {
  return gulp.src(config.ngTemplate.sources, { cwd: config.base.source })
    .pipe(ngTemplateCache({
			module: config.ngTemplate.module
		}))
		.pipe(rename('src/' + config.ngTemplate.target))
    .pipe(gulp.dest(config.base.tmp))
})

// -----------------------------------------------
// - file copying
// -----------------------------------------------

gulp.task('dist:copy:src', ['dist:purge'], function () {
	return gulp.src(config.scripts, { cwd: config.base.source })
		.pipe(gulp.dest(config.base.tmp + 'src/'))
})

gulp.task('dist:copy:styles', ['dist:purge'], function () {
	return gulp.src(config.styles, { cwd: config.base.source })
		.pipe(rename({ dirname: 'styles/' }))
		.pipe(gulp.dest(config.base.tmp))
})

// -----------------------------------------------
// - concatenation
// -----------------------------------------------

gulp.task('dist:concat:src', ['dist:copy:src', 'dist:templates'], function () {
		return gulp.src(Array.prototype.concat.call(
				config.scripts,
				'*.js'			// append dynamically loaded files
			), { cwd: config.base.tmp + 'src/' })
			.pipe(concat(config.path.app, { newLine: ';\n' }))
			.pipe(ngAnnotate({ add: true,  single_quotes: true }))
			.pipe(gulp.dest(config.base.tmp))
			.pipe(uglify({ mangle: true }))
			.pipe(rename({ suffix: ".min" }))
			.pipe(gulp.dest(config.base.tmp))
})

gulp.task('dist:concat:libs', function () {
		// start with unminified
		return gulp.src(config.libs, { cwd: config.base.source })
			.pipe(concat(config.path.libs, { newLine: ';\n' }))
			.pipe(gulp.dest(config.base.tmp))
})

gulp.task('dist:concat:libs:min', function () {
		return gulp.src(config.libs.map((lib) => {
				return lib.replace(/.js$/, '.min.js')
			}), { cwd: config.base.source })
			.pipe(concat(config.path.libs, { newLine: ';\n' }))
			.pipe(rename({ suffix: ".min" }))
			.pipe(gulp.dest(config.base.tmp))
})

gulp.task('dist:concat:styles', ['dist:copy:styles'], function () {
		return gulp.src('styles/*.css', { cwd: config.base.tmp })
			.pipe(concat(config.path.styles), { newLine: ';' })
			.pipe(gulp.dest(config.base.tmp))
			// .pipe(uglify({ mangle: false, preserveComments: 'license' }))
			// .pipe(rename({ suffix: ".min" }))
			.pipe(gulp.dest(config.base.tmp))
})

// -----------------------------------------------
// - indexing
// -----------------------------------------------
gulp.task('dist:index', ['dist:concat'], function () {

	function injectFiles(opts) {
		return inject(gulp.src([
			config.path.libs,
			config.path.app,
			config.path.styles
		].map(function(path) {
			return config.minify !== true ? path : path.replace(/\.js$/, '.min.js')
		}), {
			read: false,
			cwd: config.base.tmp
		}), opts)
	}

	return gulp
		.src(config.path.indexTpl, { cwd: config.base.source })
		.pipe(rename(config.path.index))
   	.pipe(gulp.dest(config.base.tmp))
		.pipe(injectFiles({ relative: true }))
		.pipe(gulp.dest(config.base.tmp))
})

// -----------------------------------------------
// - exporting
// -----------------------------------------------

gulp.task('dist:export', ['dist:index'], function () {
	return gulp.src([
			config.path.index,
			config.path.libs,
			config.path.app,
			config.path.styles
		].map(function(path) {
			return config.minify !== true ? path : path.replace(/\.js$/, '.min.js')
		}), {
			cwd: config.base.tmp
		}).pipe(gulp.dest(config.base.dist))
})

// -----------------------------------------------
// - defaults
// -----------------------------------------------
gulp.task('dist:copy', ['dist:copy:src', 'dist:copy:styles', 'dist:copy:libs'])
gulp.task('dist:concat', ['dist:concat:src', 'dist:concat:libs', 'dist:concat:libs:min', 'dist:concat:styles'])
gulp.task('dist', ['dist:export'])