
const toggleMain = document.getElementById('tgl-main');
let enabledState = true;
chrome.storage.sync.get('enabled', (items) => {
    if (items.enabled !== undefined) enabledState = items.enabled;
    toggleMain.checked = enabledState;
    toggleMain.addEventListener('change', e => {
        chrome.storage.sync.set({'enabled': toggleMain.checked});
    })
});