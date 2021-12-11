import './popup.css';

const COMMAND_KEY = "command";
const INPUT_ID = "command";

(async function() {
	
	/** Find elements */
	const commandInput = <HTMLInputElement>document.getElementById(INPUT_ID);
	const saveButton = <HTMLButtonElement>document.getElementById("save");	
	
	/** Set command input default value */
	const { command } = await chrome.storage.sync.get(COMMAND_KEY);
	commandInput.value = command;
	const initialValue = commandInput.value;


	/** Add input event listener */
	commandInput?.addEventListener("input", (evt) => {
		const input = <HTMLInputElement>evt.target;
		if (input.value.length > 0) {
			input.value = input.value[input.value.length - 1];
			if (input.value !== initialValue) {
				saveButton.disabled = false;
			}
		} else {
			saveButton.disabled = true;
		}
	});

	/** Add save button event listener */
	saveButton.addEventListener("click", async (evt) => {
		if (commandInput.value.length === 1) {
			await chrome.storage.sync.set({ [COMMAND_KEY]: commandInput.value });
			saveButton.disabled = true;
		}
	});
})();