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
		link.href = chrome.runtime.getURL("/src/inject/field_report/field_report.css");
		head.appendChild(link);

	}
	}, 10);
});
