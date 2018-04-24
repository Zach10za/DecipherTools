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
		// link.href = chrome.runtime.getURL("/src/inject/builder/builder.css");
		// head.appendChild(link);
		

		const secondaryNavbar = document.querySelector('nav.gh-secondary-navigation ul');
		const secondaryNavbarXML = document.querySelector('nav.gh-secondary-navigation ul li.gh-menu-holder ul.gh-dropdown-menu li:nth-of-type(3)');
		secondaryNavbar.insertBefore(secondaryNavbarXML, secondaryNavbar.querySelector('li:nth-of-type(2)'));


		const leftPaneWidthDefault = 400;

		const leftPane = document.getElementById("leftPane");
		let leftPaneWidthCurrent = parseInt(leftPane.style.width.split('px')[0], 10);
		let shift = leftPaneWidthDefault - leftPaneWidthCurrent;
		leftPane.style.width = leftPaneWidthDefault + 'px';

		const rightPane = document.getElementById("rightPane");
		rightPane.style.left = (parseInt(rightPane.style.left.split('px')[0], 10) + shift) + 'px';
		rightPane.style.width = (parseInt(rightPane.style.width.split('px')[0], 10) - shift) + 'px';

		const stageCurtain = document.getElementById("stage-curtain-toggle");
		stageCurtain.style.left = (parseInt(stageCurtain.style.left.split('px')[0], 10) + shift) + 'px';

		const stage = document.getElementById("stage");
		stage.style.width = (parseInt(stage.style.width.split('px')[0], 10) - shift) + 'px';

		const optionsPanel = document.getElementById("optionsPanel");
		optionsPanel.style.left = (parseInt(optionsPanel.style.left.split('px')[0], 10) - shift) + 'px';

		const otherBar = rightPane.querySelector('.splitter-bar.splitter-bar-vertical');
		otherBar.style.left = (parseInt(otherBar.style.left.split('px')[0], 10) + shift) + 'px';

		const handle = document.querySelector(".vsplitbar.splitter-bar-vertical");
		handle.style.left = leftPaneWidthDefault + 'px';





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
