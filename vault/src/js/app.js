(function (window, document, undefined) {
	var curator = window.curator || {};
	
	var siteCtrl = (function () {
			var setNavTop = function () {
					_c.select('.c-nav').style.top = window.scrollY + 'px';
				},
				selectLinkHash = function () {
					var $hash = _c.select('.c-nav-list [href="' + window.location.hash + '"]'),
						$active = _c.select('.c-nav-list .active');

					if ($active) {
						$active.classList.remove('active');
					}
					
					if ($hash) {
						$hash.classList.add('active');
					}
				},
				handleHashChange = function () {
					selectLinkHash();
					setNavTop();
				},
				toggleNav = function (e) {
					e.preventDefault();

					setNavTop();
					_c.select('body').classList.toggle('c-nav-toggled');
				},
				toggleMatSrc = function (e) {
					e.preventDefault();

					var srcId = this.getAttribute('data-toggle-src');
					
					_c.select('[data-mat-src="' + srcId + '"]').classList.toggle('show');
				},
				init = function () {
					_c.delegate(document, 'click', '[data-toggle-src]', toggleMatSrc);
					_c.on('click', '[data-toggle-nav]', toggleNav);
					_c.on('hashchange', window, handleHashChange);
					
					selectLinkHash();
				};
		
			return {
				init: init,
				toggleNav: toggleNav
			};
		})();
	
	curator.siteCtrl = siteCtrl;
	curator.siteCtrl.init();

	window.curator = curator;
})(window, document);