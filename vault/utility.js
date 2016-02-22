var _ = require('lodash');

var omitDeep = function (obj, filter) {
		filter = _.isObject(filter) ? filter : new RegExp(filter, 'g');
		
		var cleaned = {};
		
		_.forOwn(obj, function (val, key) {
			if (!key.match(filter)) {
				if (_.isObject(val)) {
					cleaned[key] = omitDeep(val, filter);
				} else {
					cleaned[key] = val;
				}
			}
		});
		
		return cleaned;
	},
	findAllVals = function (obj, filter) {
		filter = _.isObject(filter) ? filter : new RegExp(filter, 'g');
		
		var vals = [];
		
		if (obj instanceof Array) {
			_.forEach(obj, function (item) {
				if (_.isObject(item)) {
					vals.push(findAllVals(item, filter));
				} else if (item.match(filter)) {
					vals.push(item);
				}
			});
		} else if (obj instanceof Object) {
			_.forOwn(obj, function (val, key) {
				if (key.match(filter)) {
					vals.push(val);
				} else if (_.isObject(val)) {
					vals.push(findAllVals(val, filter));
				}
			});
		}
		
		return _.flattenDeep(vals);
	};

module.exports = {
	omitDeep: omitDeep,
	findAllVals: findAllVals
};