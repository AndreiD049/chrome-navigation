import CommandInput from "./CommandInput";
import GlobalController from "./Global/GlobalController";

const defaultCommand = ":";

document.addEventListener("readystatechange", async () => {
	const { command } = await chrome.storage.sync.get("command");
	const commandPrompt = new CommandInput();
	const listener = new GlobalController(command || defaultCommand, commandPrompt.render);
	listener.init();
});