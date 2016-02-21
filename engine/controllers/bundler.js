var request = require('request'),
	cheerio = require('cheerio'),
	_ = require('lodash'),
	utils = require('../utility'),
	viewData = require('../../data.json');

var getUrls = function () {
		var allLinks = _.compact(utils.findAllVals(viewData, 'link')),
			links = _.reject(_.uniq(allLinks), function(item) {
					return item.match(/#/g);
				});
		
		links.push('/index.html', '/docs/index.html');

		return _.map(links, function (item) {
				var url = item;

				if (!/\.html$/g.test(item)) {
					url += '/index.html';
				}
				
				return url;
			});
	};

module.exports = {
	getUrls: getUrls
};