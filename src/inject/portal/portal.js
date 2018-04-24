chrome.extension.sendRequest("show_page_action");

chrome.runtime.sendMessage({type: "enabled"}, function(response) {
	if (response.enabled === false) return;
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// const head = document.head || document.getElementsByTagName('head')[0];
		// const link = document.createElement('link');
		// link.rel = "stylesheet";
		// link.type = "text/css";
		// link.href = chrome.runtime.getURL("/src/inject/portal/portal.css");
		// head.appendChild(link);

		const rows = document.querySelectorAll('div.table-row.project.py-3');
		rows.forEach((node) => {
			node.classList.remove('py-3');
		});
	}
	}, 10);
});
