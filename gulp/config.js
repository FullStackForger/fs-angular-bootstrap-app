const argv = require('yargs').argv

module.exports = {
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