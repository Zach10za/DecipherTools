chrome.extension.sendRequest("show_page_action");

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		const rows = document.querySelectorAll('div.table-row.project.py-3');
		rows.forEach((node) => {
			node.classList.remove('py-3');
		});
	}
	}, 10);
});
