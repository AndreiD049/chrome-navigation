/**
 * Global object injected into the page.
 * Represents a state object
 * 
 * Possible states:
 * 	- Waiting - nothing is displayed to the user, waiting for the command button to be pressed
 * 	- Command mode - the command is being inserted, ignore all other events
 * 	- Selection mode - command was executed and now user sees some tips on the screen and he need to choose one
 * 
 * Waiting > Command mode > Selection mode+
 * ^______________________________________|
 * 
 */
import CommandView from "../views/CommandView";

export type ControllerState = "WAITING" | "COMMAND" | "SELECTION";

export default class GlobalController {
	private commandView: CommandView;
	private state: ControllerState;

	constructor(private key: string) {
		this.commandView = new CommandView(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.state = "WAITING";
	}

	public handleKeyPress(event: KeyboardEvent) {
		if (event.key === this.key && this.state === "WAITING") {
			event.preventDefault();
			this.state = "COMMAND";
			this.commandView.show();
		}
	}

	public hideCommand() {
		this.state = "WAITING";
	}
}