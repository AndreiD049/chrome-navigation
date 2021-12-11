chrome.runtime.onInstalled.addListener((details) => {
	console.log("Installed", details.reason);
});