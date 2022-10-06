import sheet from './components.css' assert { type: 'css' };

window.customElements.define('x-input', class extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<div>x-input</div>`;
	}
});

window.customElements.define('x-range', class extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `<div>x-range</div>`;
	}
});

window.customElements.define('x-select', class extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = ``;
		this.shadowRoot.adoptedStyleSheets = [ sheet ];
		for(const [i, child] of Object.entries(this.children)){
			if(child.tagName !== 'OPTION') continue;
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
});

window.customElements.define('x-form', class extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [ sheet ];
		this.shadowRoot.innerHTML = `<form></form>`;
		const form = this.shadowRoot.querySelector('form');
		for(const [i, child] of Object.entries(this.children)){
			const childDiv = document.createElement('div');
			childDiv.innerHTML = `<label>${child.type||child.tagName.toLowerCase()}</label>`
			childDiv.append(child);
			form.append(childDiv);
		}
	}
});
