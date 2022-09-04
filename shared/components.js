/*
<input type="button">
<input type="checkbox">
<input type="color">
<input type="date">
<input type="datetime-local">
<input type="email">
<input type="file">
<input type="hidden">
<input type="image">
<input type="month">
<input type="number">
<input type="password">
<input type="radio">
<input type="range">
<input type="reset">
<input type="search">
<input type="submit">
<input type="tel">
<input type="text">
<input type="time">
<input type="url">
<input type="week">
*/

import sheet from './components.css' assert { type: 'css' };


class XInput extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<div>x-input</div>`;
	}
}

window.customElements.define(
	'x-input', XInput
);

class XSelect extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = ``;
		this.shadowRoot.adoptedStyleSheets = [ sheet ];
		for(const [i, child] of Object.entries(this.children)){
			const childDiv = document.createElement('div');
			childDiv.innerHTML = child.textContent;
			childDiv.classList.add('optionButton');
			childDiv.onclick = (e) => {
				const selected = this.shadowRoot.querySelector('.selected');
				if(selected && selected !== e.target)
					selected.classList.remove('selected');
				e.target.classList.add('selected');
			};
			if(i==="0"){
				childDiv.classList.add('selected');
			}
			this.shadowRoot.append(childDiv);
		}
	}
}

window.customElements.define(
	'x-select', XSelect
);