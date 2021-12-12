export function createElementFromHTML<T extends Element>(htmlString: string): T {
	const template = document.createElement("template")
	template.innerHTML = htmlString;
	return <T>template.content.firstElementChild;
}