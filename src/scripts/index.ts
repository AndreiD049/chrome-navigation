import CommandInput from "./views/CommandView";
import GlobalController from "./controllers/GlobalController";

const defaultCommand = ":";

document.addEventListener("readystatechange", async () => {
	const { command } = await chrome.storage.sync.get("command");
	const listener = new GlobalController(command || defaultCommand);
	document.addEventListener("keypress", listener.handleKeyPress);
});