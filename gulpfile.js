'use strict';

var config = require('./config.json'),
	gulp = require('gulp'),
	mods = require('gulp-load-plugins')({pattern: ['*'], scope: ['devDependencies']}),
	dataCtrl = require('./engine/controllers/data-builder'),
	bundlerCtrl = require('./engine/controllers/bundler');

var sassOpts = {},
	sassDest = './styleguide/assets/css',
	jsDest = './styleguide/assets/js',
	ccssDest = './engine/public/css',
	cjsDest = './engine/public/js',
	jsMinAction = mods.util.noop,
	copyTasks = ['/engine/public/fonts'],
	createBundleCopy = function (path) {
		var asset = path.match(/(\w+)$/g),
			destDir = './' + config.bundleDir + '/assets/' + asset,
			task = 'bundle:' + asset;

		gulp.task(task, function () {
			gulp.src('.' + path + '/**/*')
			.pipe(gulp.dest(destDir));
		});

		return task;
	},
	bundleTasks = [
					'set:dist',
					'curator:data',
					'curator:createPages',
					'curator:assets',
					'material:assets'
				].concat(copyTasks.map(createBundleCopy)),
	initDist = function () {
		if (mods.util.env.type === 'dist') {
			sassOpts = {outputStyle: 'compressed'};
			sassDest = ccssDest = './' + config.bundleDir + '/assets/css';
			
			jsDest = cjsDest = './' + config.bundleDir + '/assets/js';
			jsMinAction = mods.uglify;
		}
	},
	logSassError = function (err) {
		console.log(err.formatted);
		this.emit("end");
	},
	assetUrlzr = function (path, type, asset) {
		var base = './' + path + '/';
		
		if (type) {
			base += type + '/';
		}

		return base + asset;
	},
	jsFiles = [
		'vendor/classList.min.js',
		'vendor/json2.js',
		'vendor/highlight.js',
		'utility.js',
		'config.js',
		'app.js'
	],
	curatorJS = jsFiles.map(assetUrlzr.bind(null, 'engine/src','js')),
	materialJS = config.jsFiles.map(assetUrlzr.bind(null, 'styleguide/materials','js')),
	materialCSS = config.cssFiles.map(assetUrlzr.bind(null, 'styleguide/materials', null)),
	urlPatterns = {
		patterns: [
			{
				match: /\/curator-core/g,
				replacement: ''
			},
			{
				match: /href="\/?/g,
				replacement: 'href="' + config.bundleRoot + '/'
			},
			{
				match: /src="\/?/g,
				replacement: 'src="' + config.bundleRoot + '/'
			}
		]
	},
	sassTasks = mods.lazypipe()
				.pipe(mods.autoprefixer)
				.pipe(mods.combineMq),
	jsTasks = mods.lazypipe()
				.pipe(jsMinAction);

gulp.task('curator:css', function () {
	return gulp.src('./engine/src/scss/curator.scss')
			.pipe(mods.sass(sassOpts).on('error', logSassError))
			.pipe(sassTasks())
			.pipe(gulp.dest(ccssDest));
});

gulp.task('material:css', function () {
	return gulp.src(materialCSS)
			.pipe(mods.sass(sassOpts).on('error', logSassError))
			.pipe(gulp.dest(sassDest));
});

gulp.task('curator:js', function () {
	return gulp.src(curatorJS)
			.pipe(mods.concat('curator.js'))
			.pipe(jsTasks())
			.pipe(gulp.dest(cjsDest));
});

gulp.task('material:js', function () {
	return gulp.src(materialJS)
			.pipe(mods.concat('materials.js'))
			.pipe(jsTasks())
			.pipe(gulp.dest(jsDest));
});

gulp.task('material:images', function () {
	return gulp.src('./styleguide/assets/images/**/*')
			.pipe(mods.imagemin({
				progressive: true
			}))
			.pipe(gulp.dest('./' + config.bundleDir + '/assets/images'));
});

gulp.task('curator:createPages', function () {
	var urls = bundlerCtrl.getUrls();

	mods.remoteSrc(urls, {
		base: 'http://localhost:' + parseInt(config.localPort, 10),
	})
	.pipe(mods.replaceTask(urlPatterns))
	.pipe(mods.prettify({'indent-with-tabs': true}))
	.pipe(gulp.dest('./' + config.bundleDir + '/'));

});

gulp.task('curator:data', dataCtrl.buildUIData);

gulp.task('curator:assets', ['curator:css', 'curator:js']);
gulp.task('material:assets', ['material:css', 'material:js', 'material:images']);

gulp.task('set:dist', function () {
	mods.util.env.type = 'dist';
	initDist();
});

gulp.task('curator:watch', ['curator:assets'], function () {
	mods.watch('./engine/src/js/**/*.js', mods.batch(function (events, done) {
		mods.runSequence('curator:js', done);
	}));
	
	mods.watch('./engine/src/scss/**/*.scss', mods.batch(function (events, done) {
		mods.runSequence('curator:css', done);
	}));
	
	mods.watch('./styleguide/**/{*.html|*.md}', mods.batch(function (events, done) {
		mods.runSequence('curator:data', done);
	}));
});

gulp.task('material:watch', ['material:css', 'material:js'], function () {
	mods.watch('./styleguide/materials/**/*.js', mods.batch(function (events, done) {
		mods.runSequence('material:js', done);
	}));
	
	mods.watch('./styleguide/materials/**/*.scss', mods.batch(function (events, done) {
		mods.runSequence('material:css', done);
	}));
	
	mods.watch('./styleguide/**/{*.html|*.md}', mods.batch(function (events, done) {
		mods.runSequence('curator:data', done);
	}));
});

gulp.task('bundle', bundleTasks, function () {
	console.log('bundle done!');

});

gulp.task('default', ['curator:data', 'curator:assets', 'curator:watch']);
