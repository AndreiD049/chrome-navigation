export default class CommandInput {
	private id: string;
	private input: HTMLInputElement;

	constructor() {
		this.id = (new Date()).getTime().toString();
		this.render = this.render.bind(this);
		this.input = document.createElement("input");
		this.input.style.cssText = `
			width: 250px;
			height: 30px;
			margin: 0;
			padding: 0;
		`;
	}

	public render() {
		const alreadyRendered = document.getElementById(this.id);
		if (alreadyRendered === null) {
			/** First time rendering */
			const div = document.createElement("div");
			div.appendChild(this.input);
			div.id = this.id;

			div.style.cssText = `
				box-sizing: border-box;
				border: 1px dashed black;
				padding: 2px;
				max-width: 300px;
				position: fixed;
				bottom: 10px;
				left: 10px;
			`;

			div.addEventListener("focusout", this.blurEvent.bind(this));
			document.body.appendChild(div);
		} else if (alreadyRendered.style.visibility === "hidden") {
			alreadyRendered.style.visibility = "visible";
		}
		this.input.focus();
	}

	private blurEvent = (ev: FocusEvent) => {
		const el = <HTMLDivElement>ev.currentTarget;
		el.style.visibility = "hidden";
		this.input.value = "";
	}
}