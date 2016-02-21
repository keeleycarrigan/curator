(function (window, document, undefined) {
	var curator = window.curator || {};
	
	var configCtrl = (function () {
			var $form = _c.byID('c-config-form'),
				parseValues = function (items) {
					var values = false;

					if (items && !_c.select('.error')) {
						values = {
							cssFiles: [],
							jsFiles: []
						};

						for (var i = 0, total = items.length; i < total; i += 1) {
							var $item = items[i],
								name = $item.name,
								value = $item.value;
							
							if (value && value.trim() !== '') {
								if (/js-file-/.test(name)) {
									values.jsFiles.push(value);
								} else if (/css-file-/.test(name)) {
									values.cssFiles.push(value);
								} else {
									values[name] = value;
								}
							}
						}
					}
					
					return values;
				},
				reorderFileIds = function ($inputs) {
					for (var i = 0, numInputs = $inputs.length; i < numInputs; i += 1) {
						var $input = $inputs[i],
							type = /js-/.test($input.name) ?  'js' : 'css',
							inputId = type + '-file-' + i;
						
						$input.name = inputId;
						$input.id = inputId;
					}
				},
				getHTML = function (item) {
					return item.outerHTML;
				},
				moveAsset = function (e) {
					e.preventDefault();

					var direction = this.getAttribute('data-move'),
						$row = _c.getParents(this, '.c-row'),
						curIdx = _c.getIndex($row),
						nextIdx = direction === 'up' ? curIdx - 1 : curIdx + 1,
						$list = $row.parentNode,
						$rowArray = [].slice.call($row.parentNode.querySelectorAll('.c-row'));

					var newHTML = _c.arrayMove($rowArray, curIdx, nextIdx).map(getHTML).join('');

					$list.innerHTML = newHTML;
					reorderFileIds($list.querySelectorAll('input'));
				},
				removeFileListing = function ($listing) {
					var $parent = $listing.parentNode;

					$listing.parentNode.removeChild($listing);
					
					reorderFileIds($parent.querySelectorAll('input'));
				},
				handleInputBlur = function (e) {
					if (this.value.trim() === '') {
						if (/-file-/.test(this.name)) {
							removeFileListing(_c.getParents(this, '.c-row'));
						} else {
							this.classList.add('error');
						}
					} else {
						this.setAttribute('value', this.value.trim());
						this.classList.remove('error');
					}
				},
				addAsset = function (e) {
					e.preventDefault();
					
					var fileType = this.getAttribute('data-add-file'),
						$list = _c.select('[name="' + fileType + 'Files"] .c-file-list'),
						nextIdx = $list.querySelectorAll('input').length,
						id = fileType + '-file-' + nextIdx;
						
					var $row = document.createElement('li'),
						rowHTML = '<div class="c-grid-two-third">' + "\n";

						rowHTML += '<input type="text" name="' + id + '" class="c-edit-input" />' + "\n";
						rowHTML += '</div>' + "\n";
						rowHTML += '<div class="c-grid-one-third">' + "\n";
						rowHTML += '<a href="#" data-move="up"><i class="c-icon-up-arrow"></i></a>' + "\n";
						rowHTML += '<a href="#" data-move="down"><i class="c-icon-down-arrow"></i></a>' + "\n";
						rowHTML += '</div>' + "\n";
					
					$row.classList.add('c-row');
					$row.innerHTML = rowHTML;
					
					$list.appendChild($row);
					$row.querySelector('input').focus();
				},
				showRespMsg = function (el) {
					var $el = _c.byID(el);
					
					$el.classList.add('show');
									
					var addFade = setTimeout(function () {
							$el.classList.add('fade-out');
							
							clearTimeout(addFade);
						}, 10),
						fadeOut = setTimeout(function () {
							$el.classList.remove('show', 'fade-out');
							
							clearTimeout(fadeOut);
						}, 5000);
				},
				saveConfig = function (e) {
					e.preventDefault();
					
					var values = parseValues(_c.selectAll('.c-edit-input')),
						ajax = new XMLHttpRequest();
					
					if (values) {
						ajax.open('POST', '/config/save', true);
						ajax.setRequestHeader('Content-Type', 'application/json');
						ajax.send(JSON.stringify(values));
						
						ajax.onreadystatechange = function () {
							var DONE = 4,
								OK = 200;

							if (ajax.readyState === DONE) {
								if (ajax.status === OK) {
									showRespMsg('success-msg');

									console.log('success!');
									
								} else {
									showRespMsg('error-msg');

									console.log('error!');
								}
							}
						};
					} else {
						console.log('form error');
					}

				},
				init = function () {
					if ($form) {
						_c.on('click', _c.byID('save-config'), saveConfig);
						_c.delegate($form, 'click', '[data-add-file]', addAsset);
						_c.delegate($form, 'click', '[data-move]', moveAsset);
						_c.delegate($form, 'blur', 'input', handleInputBlur, true);
					}
				};
		
			return {
				init: init
			};
		})();
	
	curator.configCtrl = configCtrl;
	curator.configCtrl.init();

	window.curator = curator;
})(window, document);