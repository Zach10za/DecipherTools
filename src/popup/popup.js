
const toggleMain = document.getElementById('tgl-main');
let enabledState = true;
chrome.storage.sync.get('enabled', (items) => {
    if (items.enabled !== undefined) enabledState = items.enabled;
    toggleMain.checked = enabledState;
    toggleMain.addEventListener('change', e => {
        chrome.storage.sync.set({'enabled': toggleMain.checked});
    })
});

const toggleTheme = document.getElementById('tgl-theme');
chrome.storage.sync.get('theme', (items) => {
    let themeState = items.theme || "light";
    toggleTheme.checked = themeState === "dark";
    toggleTheme.addEventListener('change', e => {
        console.log("Setting theme: ", toggleTheme.checked ? "dark" : "light");
        chrome.storage.sync.set({'theme': toggleTheme.checked ? "dark" : "light"});
    })
});
