export interface IGlobalContext {
	inputFocusEventsAllowed: boolean;
}

export default class GlobalContext implements IGlobalContext {
	public inputFocusEventsAllowed: boolean;
	
	constructor() {
		this.inputFocusEventsAllowed = false;
	}
}