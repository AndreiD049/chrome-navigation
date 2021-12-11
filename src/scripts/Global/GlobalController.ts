import GlobalContext, { IGlobalContext } from "./Context";

export default class GlobalController {
	private context: IGlobalContext;

	constructor(private key: string, private action: (ctx: IGlobalContext) => void) {
		this.context = new GlobalContext();
	}

	public init() {
		document.addEventListener("keypress", this._listener.bind(this));
	}

	private _listener(event: KeyboardEvent) {
		if (event.key === this.key) {
			/** Check if event in input allowed */
			if (
				!this.context.inputFocusEventsAllowed && 
				document.activeElement && 
				document.activeElement.tagName === "INPUT"
			) {
				return;
			}

			event.preventDefault();
			this.action(this.context);
		}
	}
}