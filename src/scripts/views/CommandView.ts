import "../../styles/main.css";
import { createElementFromHTML } from "../../utils";
import GlobalController from "../controllers/GlobalController";
import { Fragment, IFragment } from "./Fragment";

export default class CommandInput {
	private id: string;
	private input: HTMLInputElement | undefined;
	private visible: boolean;
	private element: HTMLDivElement;
	private commandContainer: HTMLSpanElement | undefined;
	private body: HTMLBodyElement
	private prevChar: string;
	private fragments: IFragment[];

	constructor(private controller: GlobalController) {
		this.id = (new Date()).getTime().toString();
		this.element = this.createElement();
		this.visible = false;
		this.body = <HTMLBodyElement>document.body;
		this.prevChar = "";
		this.fragments = [];
	}

	public show() {
		this.visible = true;
		this.render();
	}

	public hide() {
		if (this.visible) {
			this.visible = false;
			this.render();
			this.controller.hideCommand();
		}
	}

	private render() {
		if (this.visible) {
			this.body.appendChild(this.element);
			this.input?.focus();
		} else {
			this.body.removeChild(this.element);
			this._reset();
		}
	}

	private createElement(): HTMLDivElement {
		const div = createElementFromHTML<HTMLDivElement>(`
			<div class="fixed bg-slate-200 text-lg text-black left-3 bottom-7 z-50" id="e-${this.id}">
				<div class="p-1 m-0">
					<span>:</span>
					<span id="c-${this.id}"></span>
					<input 
						autocomplete="off"
						type="text" 
						name="command" 
						id="i-${this.id}"
						class="bg-transparent border-0 outline-none m-0 p-0"
					/>
				</div>
			</div>
		`);
		this.commandContainer = <HTMLSpanElement>div.querySelector(`#c-${this.id}`);

		this.input = <HTMLInputElement>div.querySelector(`#i-${this.id}`);
		this.setupInputEvents();

		div.addEventListener("keydown", this._handleKeyPress.bind(this));
		div.addEventListener("focusout", this.hide.bind(this));
		return div;
	}

	private _handleKeyPress(event: KeyboardEvent) {
		if (event.key === "Escape") {
			this.hide();
		} else if (event.key === "Enter") {
			console.log("Doing something...");
			this.hide();
		}
	}

	private setupInputEvents() {
		this.input?.addEventListener("input", this._handleCommandInput.bind(this));
		this.input?.addEventListener("keydown", this._handleInputBackspace.bind(this));
	}

	/**
	 * When user presses a key on the command input
	 * We need to check which key was pressed and add it to the command container
	 * First, we need to check whether there is already something in the container
	 * If nothing, then create a span and add it there
	 * If there is already something, check if last element is a text span and add the text there
	 * At the end, clear the input's value, as we should handle only one character at a time
	 * @param event InputEvent
	 */
	private _handleCommandInput(event: Event) {
		if (this.input && this.commandContainer) {
			const type = Fragment.getFragmentType(this.input.value);
			const lastFragment = this.fragments[this.fragments.length - 1];
			if (!lastFragment || type === "input") {
				const fragment = new Fragment(this.commandContainer, type, this.input.value);
				if (type === "text") {
					fragment.addChar(this.input.value);
				}
				fragment.render();
				this.fragments.push(fragment);
			} else if (lastFragment.type === "text") {
				lastFragment.addChar(this.input.value);
			}
			this.input.value = "";
		}
	}

	/**
	 * Handle backspace
	 * @param event KeyboardEvent
	 */
	private _handleInputBackspace(event: KeyboardEvent) {
		if (event.key === "Backspace") {
			// Handle empty value
			if (this.fragments.length === 0) {
				return;
			}
			const lastFragment = this.fragments[this.fragments.length - 1];
			if (this.input && lastFragment) {
				lastFragment.removeChar();
				if (lastFragment.isEmpty()) {
					this.fragments.pop();
				}
			}
		}
	}

	private _reset() {
		this.prevChar = "";
		if (this.input) {
			this.input.value = "";
		}
		if (this.commandContainer) {
			this.commandContainer.innerHTML = ""
		}
	}
}