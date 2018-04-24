chrome.extension.onRequest.addListener(function (request, sender) {
    if (request == "show_page_action") {
      chrome.pageAction.show(sender.tab.id);
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.sync.get('enabled', function(items) {
    if (request.type === "enabled") sendResponse({enabled: items.enabled});
  });
  return true;
});