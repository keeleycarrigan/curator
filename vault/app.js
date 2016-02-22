var appRoot = require('app-root-path'),
	config = require(appRoot + '/config.json'),
	express = require('express'),
	router = express.Router(),
	app = express(),
	bodyParser = require('body-parser'),
	jsonParser = bodyParser.json(),
	path = require('path'),
	nunjucks = require('nunjucks'),
	Q = require('q'),
	appData = require(appRoot + '/data.json'),
	dataCtrl = require(appRoot + '/vault/controllers/data-builder'),
	matRoute = require(appRoot + '/vault/routes/materials'),
	configRoute = require(appRoot + '/vault/routes/config'),
	server = null,
	nunEnv;

app.engine('html', nunjucks.render);
// telling express the default folder for pages is 'views'
app.set('views', appRoot + '/styleguide/views');

nunEnv = nunjucks.configure(app.get('views'), {
	cache: false,
	autoescape: false,
	express: app
});

nunEnv.addGlobal('appData', appData);
nunEnv.addGlobal('dev', true);

app.set('view engine', 'html');

app.use(express.static(appRoot + '/styleguide'));
app.use('/curator-core/assets', express.static(appRoot + '/vault/public'));

router.use(function(req, res, next) {
	/**
		Can't redirect to 'whatever/' because it messes something
		up when creating static versions of all the pages.
	**/
	if (/\/index/i.test(req.url)) {
		req.url = req.url.replace('index.html', '');
	}
	
	next();
});


router.get('/', function (req, res) {
		res.render('_index', {sectionID: 'c-overview'});
});

router.get('/' + config.compDir + '/:material/', matRoute.viewMat.bind(null, appData));

router.get('/docs', function (req, res) {
		res.render('_docs', {sectionID: 'c-docs'});
});

router.get('/config', configRoute.view);

router.post('/config/save', jsonParser, configRoute.save);

router.get('/pages/*', function (req, res) {
	res.render(req.url.replace('pages', '').slice(2), {sectionID: 'c-pages'});
});

app.use('/', router);

module.exports = {
	nunjucks: nunEnv,
	rebuild: function (cb) {
		return dataCtrl.buildUIData();
	},
	start: function () {
		var deferred = Q.defer();

		this.rebuild().then(function () {
			server = app.listen(config.localPort);
	
			deferred.resolve();
		});
		
		return deferred.promise;
	},
	stop: function () {
		server.close();
	}
};