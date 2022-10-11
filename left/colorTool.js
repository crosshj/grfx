import sheet from './colorTool.css' assert { type: 'css' };

const toolDom = `
<div class="color-controls">
	<svg id="reset" viewBox="0 0 250 250">
		<rect x="60" y="60" width="160" height="160" style="fill: white; stroke: currentColor; stroke-width: 5px;"></rect>
		<rect x="15" y="15" width="160" height="160" style="fill: black; stroke: currentColor; stroke-width: 5px;"></rect>
	</svg>
	<svg id="switch" viewBox="0 0 250 250">
		<defs>
			<marker id="startarrow" fill="currentColor" markerWidth="3" markerHeight="3" refX="3" refY="1.5" orient="auto">
				<polygon points="3 0, 3 3, 0 1.5"></polygon>
			</marker>
			<marker id="endarrow" fill="currentColor" markerWidth="3" markerHeight="3" refX="0" refY="1.5" orient="auto" markerUnits="strokeWidth">
				<polygon points="0 0, 3 1.5, 0 3"></polygon>
			</marker>
		</defs>
		<line x1="99.062" y1="52.415" x2="101.719" y2="52.415" stroke="currentColor" stroke-width="32" marker-start="url(#startarrow)" style=""></line>
		<line x1="197.875" y1="145.124" x2="197.875" y2="151.228" stroke="currentColor" stroke-width="32" marker-end="url(#endarrow)" style=""></line>
		<path style="stroke: currentColor; fill: none; stroke-width: 35px; stroke-linejoin: round;" d="M 83.947 52.373 L 94.466 51.469 C 104.985 50.566 126.024 48.758 142.144 51.251 C 158.265 53.743 169.468 60.535 178.701 69.314 C 187.934 78.093 195.197 88.859 198.003 104.963 C 200.808 121.067 199.157 142.509 198.331 153.23 L 197.505 163.951" bx:d="M 83.947 52.373 U 147.062 46.951 U 180.671 67.326 U 202.46 99.625 U 197.505 163.951 1@b5ccac37"></path>
	</svg>
</div>
<div class="swatch-container">
	<input type="color" id="secondary-color" value="#ffffff">
	<input type="color" id="primary-color" value="#000000">
</div>
`
window.customElements.define('color-selector', class extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.adoptedStyleSheets = [ sheet ];
		this.shadowRoot.innerHTML = toolDom;

		const colorInputs = Array.from(this.shadowRoot.querySelectorAll('input[type="color"]'));
		for(const input of colorInputs){
			input.onchange = (e) => this.dispatchEvent(new window.Event('change'));
		}
		this.inputs = {};
		this.inputs.primary = this.shadowRoot.querySelector('#primary-color');
		this.inputs.primary.onchange = (e) => {
			this.primary = this.inputs.primary.value;
			this.dispatchEvent(new window.Event('change'));
		};
		this.inputs.secondary = this.shadowRoot.querySelector('#secondary-color');
		this.inputs.secondary.onchange = (e) => {
			this.secondary = this.inputs.secondary.value;
			this.dispatchEvent(new window.Event('change'));
		};
		this.reset = this.shadowRoot.querySelector('#reset');
		this.reset.onclick = () => {
			this.primary = this.inputs.primary.value = '#000000';
			this.secondary = this.inputs.secondary.value = '#ffffff';
			this.dispatchEvent(new window.Event('change'));
		};
		this.switch = this.shadowRoot.querySelector('#switch');
		this.switch.onclick = () => {
			const bak = this.primary;
			this.primary = this.inputs.primary.value = this.secondary;
			this.secondary = this.inputs.secondary.value = bak;
			this.dispatchEvent(new window.Event('change'));
		};
	}
	connectedCallback(){
		this.primary = this.getAttribute('primary') || this.inputs.primary.value;
		this.secondary = this.getAttribute('secondary') || this.inputs.secondary.value;
	}
	attributeChangedCallback(name, oldValue, newValue) {
		console.log(name)
	}
});