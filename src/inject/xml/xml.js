chrome.extension.sendRequest("show_page_action");

chrome.runtime.sendMessage({type: "enabled"}, function(response) {
	if (response.enabled === false) return;
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			const head = document.head || document.getElementsByTagName('head')[0];
			const link = document.createElement('link');
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = chrome.runtime.getURL("/css/monokai.css");
			head.appendChild(link);

			const secondaryNavbar = document.querySelector('nav.gh-secondary-navigation ul');
			const secondaryNavbarXML = document.querySelector('nav.gh-secondary-navigation ul li.gh-menu-holder ul.gh-dropdown-menu li:nth-of-type(2)');
			secondaryNavbar.insertBefore(secondaryNavbarXML, secondaryNavbar.querySelector('li:nth-of-type(2)'));

			const topToolBar = document.getElementById('topToolBar');
			const bottomControlBar = document.querySelector('.dux-control-bar-bottom');

			chrome.storage.sync.get(['theme'], (items) => {
				let themeState = items.theme || "light";
				if (themeState === "dark") {
					const codeMirror = document.querySelector('.CodeMirror');
					codeMirror.classList.add('cm-s-monokai');
					codeMirror.classList.remove('cm-s-default');
					topToolBar.classList.add('dark-theme');
					bottomControlBar.classList.add('dark-theme');
				}
				chrome.storage.sync.set({'theme': themeState});
			});

			const viewMenu = document.getElementById('view-menu');
			const themeToggle = viewMenu.querySelector('.viewOptions').cloneNode(true);
			themeToggle.classList.remove('viewOptions');
			themeToggle.removeChild(themeToggle.getElementsByTagName('ul')[0]);
			const linkText = themeToggle.getElementsByTagName('a')[0];
			linkText.classList.remove('icon-dropdown');
			linkText.removeChild(linkText.getElementsByTagName('span')[1]);
			linkText.textContent = 'Toggle Night Mode';
			linkText.onclick = function(e) {
				const codeMirror = document.querySelector('.CodeMirror');
				if (codeMirror.classList.contains('cm-s-default')) {
					codeMirror.classList.add('cm-s-monokai');
					codeMirror.classList.remove('cm-s-default');
					topToolBar.classList.add('dark-theme');
					bottomControlBar.classList.add('dark-theme');
					chrome.storage.sync.set({'theme': "dark"});
				} else {
					codeMirror.classList.remove('cm-s-monokai');
					codeMirror.classList.add('cm-s-default');
					topToolBar.classList.remove('dark-theme');
					bottomControlBar.classList.remove('dark-theme');
					chrome.storage.sync.set({'theme': "light"});
				}
			}
			viewMenu.appendChild(themeToggle);

		}
	}, 100);
});