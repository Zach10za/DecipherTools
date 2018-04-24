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
