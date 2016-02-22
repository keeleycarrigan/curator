var appRoot = require('app-root-path'),
	config = require(appRoot + '/config.json'),
	fs = require('fs'),
	marked = require('marked'),
	markRender = new marked.Renderer(),
	hljs = require('highlight.js'),
	highlighter = function (code) {
		return hljs.highlightAuto(code).value;
	};

markRender.heading = function (text, level) {
	return '<h' + level + ' class="c-heading-' + level + '">' + text + '</h' + level + '>';
};

markRender.code = function (code) {
	return '<pre class="c-code"><code>' + highlighter(code) + '</pre></code>';
};

markRender.paragraph = function (text) {
	return '<p class="c-doc-p">' + text + '</p>';
};

markRender.hr = function () {
	return '<hr class="c-doc-rule">';
};


markRender.blockquote = function (quote) {
	return '<blockquote class="c-doc-quote">\n' + quote + '\n</blockquote>';
};

markRender.list = function (text, ordered) {
	var tag = ordered ? 'ol' : 'ul';

	return '<' + tag + ' class="c-doc-list">\n' + text + '\n</' + tag + '>';
};

markRender.table = function (header, body) {
	return '<table class="c-doc-table">\n<thead class="c-doc-thead">' + header + '</thead>\n<tbody class="c-doc-tbody">' + body + '</tbody>\n</table>';
};

markRender.tablecell = function (text, flags) {
	var tag = flags.header ? 'th' : 'td',
		textAlign = '';
	
	if (flags.align) {
		textAlign = 'class="c-txt-' + flags.align + '"';
	}

	return '<' + tag + ' ' + textAlign + '>\n' + text + '\n</' + tag + '>';
};

var wordCase = function (word, caseDir) {
		return word.replace(/\w\S*/g, function (txt) {
					return txt.charAt(0)[(caseDir || 'toUpper') + 'Case']() + txt.substr(1);
				});
	},
	removeOrderNum = function (string) {
		return string.replace(/^(\d-)/, '');
	},
	processMD = function (md) {
		return md ? marked(md, {renderer: markRender}) : false;
	},
	/**
	 * Removes spaces and creates a dashed name.
	 * @param {string} string - A string separated with spaces.
	 * @returns {string} - Returns a string that replaces spaces
	 * with dashes and is lowercase.
	 */
	dashName = function (string) {
		return removeOrderNum(string).split(' ').map(function (string) {
					return wordCase(string, 'toLower');
				}).join('-');
	},
	/**
	 * Removes dashes and creates a title case name.
	 * @param {string} string - A string separated with dashes.
	 * @returns {string} - Returns a string that replaces dashes
	 * with spaces and is title cased.
	 */
	titleName = function (string) {
		return removeOrderNum(string).split('-').map(function (string, idx) {
					return wordCase(string, 'toUpper');
				}).join(' ');
	},
	/**
	 * Pulls markdown out of an html comment and runs it through
	 * the markdown processor.
	 * @param {string} note - Text in an html comment.
	 * @returns {string} - Text processed by 'marked'.
	 */
	getSnippetNotes = function (note) {
		var commentPatt = /(<!--)([\s\S)]*?)(-->)/gm;
		
		return processMD(commentPatt.exec(note)[2].trim());
	},
	/**
	 * Processes snippet(*.html) files in component folders.
	 * It takes html comments in the files and runs them through
	 * Marked and then takes the actual html and runs it through
	 * the Highligter.
	 * @param {string} html - The raw html of an html file in a component folder.
	 * @returns {object} - Component snippet notes (if any), highlighted html, and raw html.
	**/
	processHTML = function (html) {
		var commentPatt = /(<!--)([\s\S)]*?)(-->)/gm,
			snippetNote = null,
			snippetHglt = null;
		
		if (html) {
			if (commentPatt.test(html)) {
				commentPatt.lastIndex = 0;
				/**
				 * 'match' creates and array of all the comments in a snippet which
				 * are then 'mapped' to 'getSnippetNotes'. The resulting array is
				 * then joined with new lines and the whitespace is trimmed.
				**/
				snippetNote = html.match(commentPatt).map(getSnippetNotes).join("\n").trim();
			}
			
			snippetHglt = processMD('```\n' + html.replace(commentPatt, '').trim() + '\n```');
		}
		

		return {
				notes: snippetNote,
				formatted: snippetHglt,
				src: html.replace(commentPatt, '').trim()
			};
	};

module.exports = {
	highlight: highlighter,
	html: processHTML,
	title: titleName,
	markdown: processMD
};