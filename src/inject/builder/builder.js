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
		link.href = chrome.runtime.getURL("/src/inject/builder/builder.css");
		head.appendChild(link);
		

		const secondaryNavbar = document.querySelector('nav.gh-secondary-navigation ul');
		const secondaryNavbarXML = document.querySelector('nav.gh-secondary-navigation ul li.gh-menu-holder ul.gh-dropdown-menu li:nth-of-type(3)');
		secondaryNavbar.insertBefore(secondaryNavbarXML, secondaryNavbar.querySelector('li:nth-of-type(2)'));


		// Lock the left side pane
		lockTree = (locked = 'false') => {
			const leftPaneTree = document.getElementById('daTree');
			if (!leftPaneTree) return false;
			leftPaneTree.childNodes.forEach((node) => {
				if (node.dataset.lockMove && node.dataset.lockMove === locked) {
					node.dataset.lockMove = locked === 'false' ? 'true' : 'false';
				} 
			});
			return true;
		}

		let lockedState = true;
		chrome.storage.sync.get(['leftPaneLocked'], (items) => {
			if (items.leftPaneLocked !== null) lockedState = items.leftPaneLocked;

			const leftPaneLock = document.createElement('a');
			leftPaneLock.setAttribute('href', '#/');
			leftPaneLock.setAttribute('data-locked', lockedState || "");
			if (lockedState) leftPaneLock.classList.add('locked'); 
			leftPaneLock.innerHTML = lockedState ? "unlock" : "lock";
			leftPaneLock.onclick = function(e) {
				e.preventDefault();
				if (this.dataset.locked) {
					this.dataset.locked = "";
					this.classList.remove('locked'); 
					this.innerHTML = "lock";
					lockTree('true');
					chrome.storage.sync.set({'leftPaneLocked': false});
				} else {
					this.dataset.locked = true;
					this.classList.add('locked'); 
					this.innerHTML = "unlock";
					lockTree();
					chrome.storage.sync.set({'leftPaneLocked': true});
				}
			}

			const leftPaneHeader = document.querySelector('#leftPane .surveyElementsHeader');
			leftPaneHeader.classList.add('d-flex','justify-content-between');
			leftPaneHeader.appendChild(leftPaneLock);

			let treeLocked = lockTree();
			setInterval(() => {
				if (treeLocked) {
					clearInterval();
				} else {
					treeLocked = lockTree( lockedState ? 'false' : 'true');
				}
			}, 1000);
		});
		// end left side pane lock



	}
	}, 10);
});
