(function (window, document, undefined) {
	var _c = window._c || {};
	
	_c.byID = function (id) {
		return document.getElementById(id);
	};
	
	_c.select = function (selector) {
		return document.querySelector(selector);
	};
	
	_c.selectAll = function (selector) {
		return document.querySelectorAll(selector);
	};
	
	_c.getIndex = function (node) {
		var children = node.parentNode.childNodes,
			num = 0;

		for (var i = 0, numChildren = children.length; i < numChildren; i += 1) {
			if (children[i] === node) {
				return num;
			} else if (children[i].nodeType == 1) {
				num += 1;
			}
		}

		return -1;
	};

	_c.arrayMove = function(array, pos1, pos2) {
		// local variables
		var i, tmp;
		// cast input parameters to integers
		pos1 = parseInt(pos1, 10);
		pos2 = parseInt(pos2, 10);
		// if positions are different and inside array
		if (pos1 !== pos2 && 0 <= pos1 && pos1 <= array.length && 0 <= pos2 && pos2 <= array.length) {
			// save element from position 1
			tmp = array[pos1];
			// move element down and shift other elements up
			if (pos1 < pos2) {
				for (i = pos1; i < pos2; i++) {
				array[i] = array[i + 1];
				}
			}
			// move element up and shift other elements down
			else {
				for (i = pos1; i > pos2; i--) {
				array[i] = array[i - 1];
				}
			}
			// put element from position 1 to destination
			array[pos2] = tmp;
		}
		
		return array;
	};

	_c.getParents = function (elem, selector) {

		var parents = [],
			firstChar;

		if (selector) {
			firstChar = selector.charAt(0);
		}

		// Get matches
		for (; elem && elem !== document; elem = elem.parentNode) {
			if (selector) {

				// If selector is a class
				if (firstChar === '.') {
					if (elem.classList.contains(selector.substr(1))) {
						parents = elem;
						break;
					}
				}

				// If selector is an ID
				if (firstChar === '#') {
					if (elem.id === selector.substr(1)) {
						parents = elem;
						break;
					}
				}

				// If selector is a data attribute
				if (firstChar === '[') {
					if (elem.hasAttribute(selector.substr(1, selector.length - 1))) {
						parents = elem;
						break;
					}
				}

				// If selector is a tag
				if (elem.tagName.toLowerCase() === selector) {
					parents = elem;
					break;
				}
			} else {
				parents = elem;
				break;
			}
		}

		return parents;
	};
	
	_c.on = function (eventName, selector, fn) {
		var selected;
		
		if (selector instanceof Object) {
			selected = selector;
		} else {
			selected = document.querySelectorAll(selector);
		}

		if (selected.length && selected.length > 0) {
			for (var i = 0, numEls = selected.length; i < numEls; i += 1) {
				selected[i].addEventListener(eventName, fn);
			}
		} else {
			selected.addEventListener(eventName, fn);
		}
	};
	
	_c.delegate = function (delegate, eventName, selector, fn, capture) {
		capture = capture || false;

		var element;
		
		if (delegate instanceof Object) {
			element = delegate;
		} else {
			element = document.querySelector(delegate);
		}

		element.addEventListener(eventName, function(event) {
			var possibleTargets = element.querySelectorAll(selector);
			var target = event.target;

			for (var i = 0, l = possibleTargets.length; i < l; i++) {
				var el = target,
					currentEl = possibleTargets[i];

				while(el && el !== element) {
					if (el === currentEl) {
						return fn.call(currentEl, event);
					}

					el = el.parentNode;
				}
			}
		}, capture);
	};
	
	window._c = _c;
})(window, document);