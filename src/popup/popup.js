
const toggle = document.getElementById('tgl');
let enabledState = true;
chrome.storage.sync.get('enabled', (items) => {
    if (items.enabled !== undefined) enabledState = items.enabled;
    toggle.checked = enabledState;
    toggle.addEventListener('change', e => {
        chrome.storage.sync.set({'enabled': toggle.checked});
    })
});
