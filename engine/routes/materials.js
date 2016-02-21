var appRoot = require('app-root-path'),
	config = require(appRoot + '/config.json'),
	utils = require('../utility'),
	procSrvc = require(appRoot + '/engine/controllers/process'),
	_ = require('lodash');

module.exports = {
	viewMat: function (data, req, res) {
		var matType = req.params.material,
			matData = _.find(data.materials, {'name': procSrvc.title(matType)});

		res.render('_materials', {material: matData, sectionID: 'c-mats', matType: matType});
	}
};