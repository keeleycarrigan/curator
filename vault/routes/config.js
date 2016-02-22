var appRoot = require('app-root-path'),
	config = require(appRoot + '/config.json'),
	fs = require('fs'),
	_ = require('lodash');

module.exports = {
	view: function (req, res) {
			res.render('_config', {sectionID: 'c-config', config: config});
	},
	save: function (req, res) {
		var configData = JSON.stringify(_.extend(config, req.body), null, 4);

		fs.writeFile('./config.json', configData, function (err) {
			if (err) {
				res.sendStatus(500);
			} else {
				res.sendStatus(200);
			}
		});
	}
};