var appRoot = require('app-root-path'),
	config = require(appRoot + '/config.json'),
	jsondir = require('jsondir'),
	path = require('path'),
	fs = require('fs'),
	procSrvc = require(appRoot + '/vault/controllers/process'),
	_ = require('lodash'),
	Q = require('q'),
	viewData = require(appRoot + '/data.json'),
	utils = require(appRoot + '/vault/utility');

	/**
	 * Removes dashes and creates a title case name.
	 * @param {string} string - A string separated with dashes.
	 * @returns {string} - Returns a string that replaces dashes
	 * with spaces and is title cased.
	 */
var processName = function (string) {
		return string.split('-').map(function (string, idx) {
					return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
				}).join(' ');
	},
	/**
	 * Determines if the file is a '.md' (markdown) file.
	 * @param {string} value - an object created from processing a directory.
	 * @param {string} key - the object's key name. Most likely a file or directory name.
	 * @returns {boolean} - Returns true if the file is a '.md' file and it has content.
	 */
	getMDFiles = function (value, key) {
		return key.match(/(\.md)$/g) && value['-content'] !== '';
	},
	/**
	 * Filters out any files in a directory that are not html files.
	 * @param {object} material - JSON data representing the contents of a directory.
	 * @returns {object} - Returns an object with only keys representing html files.
	**/
	matchSnippets = function (material) {
		return _.pickBy(material, function (val, key) {
					/**
					 * If the the value is an object, it's key name ends with '.html', and
					 * it's '-content' key isn't empty then return true and add a key with
					 * the name of the file with '.html' removed.
					**/
					if (_.isObject(val) && key.match(/(\.html)$/g) && val['-content'] !== '') {
						val.name = key.replace(/(\.html)$/g, '');
						return val;
					}
				});
	},
	/**
	 * Creates an array of all the variations in a component directory.
	 * @param {object} material - JSON data representing the contents of a directory.
	 * @returns {object} - If a directory has html snippets the raw name,
	 * title cased name, and processed html is returned.
	**/
	getMatTypes = function (material) {
		var docHtml = false,
			snippets = matchSnippets(material);

		if (!_.isEmpty(snippets)) {
			docHtml = _.map(snippets, function (value) {
							return {
									id: value.name,
									name: procSrvc.title(value.name),
									html: procSrvc.html(value['-content'].trim())
								};
						});
		}

		return docHtml;
	},
	/**
	 * Processes an object that represents a markdown file.
	 * @param {string} type - The name of the material category. (Ex. component, pattern, etc.)
	 * @param {string} key - The name of the individual type of material.
	 * @param {object} doc - An object representing a markdown file.
	 * @returns {object} - Returns the title cased doc name, raw doc name, doc link, and processed markdown.
	**/
	makeDoc = function (type, key, doc) {
		var nameRegex = new RegExp('(' + key + '\/)([\\s\\S)]*?)(\.md)', 'g'),
			docName = nameRegex.exec(doc['-path'])[2];

		return {
				name: procSrvc.title(docName),
				id: docName,
				link: '/docs#' + docName,
				content: procSrvc.markdown(doc['-content'])
			};
	},
	/**
	 * Gets all the markdown files in a directory and creates an array.
	 * @param {string} type - The name of the material category. (Ex. component, pattern, etc.)
	 * @param {object} material - An object representing the directory of an individual type of material.
	 * @param {string} key - The name of the individual type of material.
	 * @returns {array} - Returns an array of the material type's documentation.
	**/
	getDocs = function (type, material, key) {
		/**
		 * Filters out markdown files then maps them to a function that processes
		 * the objects representing them.
		**/
		return _.map(_.filter(material, getMDFiles), makeDoc.bind(null, type, key));
	},
	/**
	 * Creates an object representing an individual type of material.
	 * @param {string} type - The name of the material category. (Ex. component, pattern, etc.)
	 * @param {object} material - An object representing the directory of an individual type of material.
	 * @param {string} key - The name of the individual type of material.
	 * @returns {object} - Returns an object with the title cased material name, raw name,
	 * link to the material, variations of the material, and documentation.
	**/
	buildMatData = function (type, val, key) {
		return {
				name: procSrvc.title(key),
				id: key,
				link: '/' + config.compDir + '/' + type + '#' + key,
				types: getMatTypes(val),
				docs: getDocs(type, val, key)
			};
	},
	/**
	 * Filters material category directories so that only it's child directories are returned.
	 * @param {object} matType - An object representing the directory of a material category.
	 * @returns {array} - Returns an array of all material type directories.
	**/
	filterMats = function  (matType) {
		return _.pickBy(matType, function (val) {
					return _.isObject(val) && val['-type'] === 'd';
				});
	},
	/**
	 * Creates an array of all types of a material category
	 * @param {object} matType - An object representing the directory of a material category.
	 * @param {string} name - The name of the material category. (Ex. component, pattern, etc.)
	 * @returns {array} - Returns an array of all material types in a category.
	**/
	makeMaterials = function (matType, name) {
		return _.map(filterMats(matType), buildMatData.bind(null, name));
	},
	getOverview = function (material) {
		var content = false;

		if (_.has(material, 'overview.md')) {
			content = procSrvc.markdown(material['overview.md']['-content']);
		}

		return content;
	},
	/**
	 * Creates an object representing a material category and it's children.
	 * @param {object} matType - An object representing the directory of a material category.
	 * @param {string} name - The name of the material category. (Ex. component, pattern, etc.)
	 * @returns {array} - Returns an object representing a material category and it's children..
	**/
	buildMatPageData = function (matType, name) {
		return {
				name: procSrvc.title(name),
				link: '/' + config.compDir + '/' + name,
				overview: getOverview(matType),
				items: makeMaterials(matType, name)
			};
	},
	/**
	 * Creates the url to a page/view.
	 * @param {object} viewData - An object representing an html file.
	 * @returns {array} - Returns either false or a cleaned url pointing to the page.
	**/
	getViewPath = function (viewData) {
		var path = false;

		if (viewData) {
			path = /(\/views).+/g.exec(viewData['-path'])[0].replace('views', 'pages');
		}
		
		return path;
	},
	/**
	 * Pushes a view directory's index file to the first spot.
	 * @param {object} val - An object representing an html file.
	 * @param {string} key - The name of the html file.
	 * @returns {boolean} - Returns true if the file is called 'index.html'.
	**/
	sortByIndex = function (val, key) {
		return val.link && val.link.match(/^index.html/g);
	},
	/**
	 * Recursive function that finds and builds out an array of all pages in a directory.
	 * @param {object} directory - An object representing a directory.
	 * @param {string} filePath - The saved path of a file.
	 * @returns {array} - Returns an array of all pages in a directory that is a direct child of 'views'.
	**/
	getSubPages = function (directory, filePath) {
		filePath = filePath || '';

		var pages = _.map(directory, function (fileData, fileName) {
						if (_.isObject(fileData)) {
							/**
							 * Creating this full path variable so we can trim the entire
							 * path of extra whitespace.
							**/
							var fullPath;
							/**
							 * If the file name says it's an html file and doesn't start
							 * with an underscore then return an object with the file path
							 * and link.
							**/
							if (/(\.html)$|^_/.test(fileName)) {
								var isIndex = /index/i.test(fileName),
									newPath = isIndex ? '' : procSrvc.title(fileName.replace('.html', ''));
								
								/**
								 * If the file is named 'index.html' remove the path separator
								 * at the end if there is one.
								**/
								if (isIndex) {
									var pathRegEx = new RegExp('(' + config.pathSeparator + ')$', 'g'),
										idxPath = filePath.trim().replace(pathRegEx, '');
									
									fullPath = idxPath + newPath;
								} else {
									fullPath = filePath + newPath;
								}
								
								return {
									name: fullPath.trim(),
									link: getViewPath(fileData)
								};
							} else if (fileData['-type'] === 'd') {
								/**
								 * If the object represents a directory get its subpages and pass on
								 * the filePath.
								**/
								var savedPath = filePath + ' ' + procSrvc.title(fileName) + ' ' + config.pathSeparator;

								return getSubPages(fileData, savedPath);
							}
						}
					});

		return _.flatten(_.sortBy(_.compact(pages), sortByIndex));
	},
	/**
	 * Builds out an entry for a view and it's subpages
	 * @param {object} fileData - An object representing a directory or file.
	 * @param {string} fileName - The name of a directory or file.
	 * @returns {array} - Returns an object representing a view and any subviews.
	**/
	buildViewData = function (fileData, fileName) {
		var viewObj = {};

		if (fileName.match(/(\.html)$/g)) {
			viewObj.name = procSrvc.title(fileName.replace('.html', ''));
			viewObj.link = getViewPath(fileData);
		} else if (fileData['-type'] === 'd') {
			/**
			 * If the object is a directory its index is set if it exists
			 * and it's children are collected.
			**/
			viewObj.name = procSrvc.title(fileName);
			viewObj.link = getViewPath(_.get(fileData, 'index.html', false));
			viewObj.subpages = getSubPages(_.omit(fileData, 'index.html'));
		}
		
		return viewObj;
	},
	/**
	 * Filters out view templates used by the app.
	 * @param {object} fileData - An object representing a directory or file.
	 * @param {string} fileName - The name of a directory or file.
	 * @returns {boolean} - Returns true if the html file is an object and it doesn't contain any of the reserved template names.
	**/
	filterViewFiles = function (fileData, fileName) {
		return !_.isObject(fileData) || fileName.match(/^(_index)|^(_materials)|^(_docs)|^(_)/g);
	},
	/**
	 * Determines if a material type has docs.
	 * @param {object} matType - An object representing an individual material within a type.
	 * @returns {array} - Returns an array of a material's docs.
	**/
	filterDocs = function (matType) {
		if (matType.docs.length > 0) {
			return matType.docs;
		}
	},
	/**
	 * Finds docs in all material entries.
	 * @param {object} material - An object representing a material type.
	 * @returns {array} - Returns an array of a material docs.
	**/
	findDocs = function (material) {
		return _.map(material.items, filterDocs);
	},
	isDirectory = function (item) {
		return _.isObject(item) && item['-type'] === 'd';
	},
	/**
	 * Processes the results of the module that scans the styleguide directory.
	 * @param {object} materials - An object representing the different material types.
	 * @param {object} views - An object representing the 'views' directory.
	 * @returns {array} - Returns an object that represents the styleguide's contents and structure.
	**/
	processResults = function (materials, views) {
		var processed = {},
			overviewFile;
		
		try {
			overviewFile = fs.readFileSync(appRoot + '/styleguide/overview.md', 'utf8');
		} catch (err) {
			overviewFile = false;
		}

		processed.overview = procSrvc.markdown(overviewFile);
		processed.materials = _.map(_.pickBy(materials, isDirectory), buildMatPageData);
		processed.views = _.map(_.pickBy(views, _.isObject), buildViewData);
		processed.docs = _.compact(_.flattenDeep(_.map(processed.materials, findDocs)));

		return processed;
	};

module.exports = {
	buildUIData: function () {
		var deferred = Q.defer();

		jsondir.dir2json(appRoot + '/styleguide', {attributes: ['content']}, function(err, results) {
			if (err) throw err;
			
			if (results) {
				results = utils.omitDeep(results, /^(_)|^(\.)/g);

				var processedRes = processResults(results.materials, results.views);
				
				// console.log(JSON.stringify(processedRes, null, 4));
				fs.writeFileSync('./data.json', JSON.stringify(_.extend(viewData, processedRes), null, 4));
				console.log('processed');
				deferred.resolve();
			}
		});
		
		return deferred.promise;
	}
};