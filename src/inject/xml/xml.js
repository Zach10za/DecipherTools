chrome.extension.sendRequest("show_page_action");

chrome.runtime.sendMessage({type: "enabled"}, function(response) {
	if (response.enabled === false) return;
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			const secondaryNavbar = document.querySelector('nav.gh-secondary-navigation ul');
			const secondaryNavbarXML = document.querySelector('nav.gh-secondary-navigation ul li.gh-menu-holder ul.gh-dropdown-menu li:nth-of-type(2)');
			secondaryNavbar.insertBefore(secondaryNavbarXML, secondaryNavbar.querySelector('li:nth-of-type(2)'));

		}
	}, 10);
});

chrome.runtime.sendMessage({type: "theme"}, function(response) {
	if (response.theme !== "dark") return;
	var readyStateCheckInterval = setInterval(function() {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);

			const head = document.head || document.getElementsByTagName('head')[0];
			const link = document.createElement('link');
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = chrome.runtime.getURL("/css/monokai.css");
			head.appendChild(link);

			const codeMirror = document.querySelector('.CodeMirror');
			console.log(codeMirror);
			codeMirror.classList.add('cm-s-monokai');
			codeMirror.classList.remove('cm-s-default');


		}
	}, 100);
});