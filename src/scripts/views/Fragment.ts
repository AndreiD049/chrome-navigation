import { createElementFromHTML } from "../../utils";

export type FragmentType = "text" | "input";

export interface IFragment {
	parent: HTMLElement;
	type: FragmentType;
	addChar: (char: string) => void;
	removeChar: () => void;
	render: () => void;
	isEmpty: () => boolean;
}

export class Fragment implements IFragment {
	private element: HTMLElement | null;
	private static indexRegex = /\d+$/;
	private lastChar = "";
	private value: string;

	constructor(public parent: HTMLElement, public type: FragmentType, input?: string) {
		this.value = "";
		this.element = this.createElement(input);
	}

	public addChar(char: string) {
		if (this.lastChar === char) {
			const lastIndex = this.value.match(Fragment.indexRegex);
			if (lastIndex === null) {
				this.value += "2";
			} else {
				this.value = this.value.replace(Fragment.indexRegex, (Number(lastIndex[0])+1).toString());
			}
		} else {
			this.value += char;
		}
		this.lastChar = char;
		if (this.type === "text" && this.element) {
			this.element.textContent = this.value;
		} else if (this.type === "input" && this.element) {
			(<HTMLInputElement>this.element).value = this.value;
		}
	}

	public removeChar() {
		this.value = this.value.slice(0, this.value.length - 1);
		if (this.isEmpty()) {
			this.removeElement();
		}
	}

	public render() {
		if (this.element) {
			this.parent.appendChild(this.element);
		}
	}
	
	public isEmpty(): boolean {
		return this.value.length === 0;
	}

	private removeElement() {
		if (this.element) {
			this.parent.removeChild(this.element);
		}
	}

	private createElement(char?: string): HTMLElement | null {
		if (this.type === "input") {
			const el = createElementFromHTML<HTMLSpanElement>(`
				<span>
					<span>${char}"</span>
					<input />
					<span>"</span>
				</span>
			`);
			return el;
		} 
		return createElementFromHTML<HTMLElement>(`<span></span>`);
	}

	static getFragmentType(char: string): FragmentType {
		console.log(char);
		return char === "f" ? "input" : "text";
	}


}