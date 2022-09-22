import getExamples from './examples/examples.js';

import * as shiki from 'https://unpkg.com/shiki@0.10.1/dist/index.browser.mjs';
shiki.setCDN('https://unpkg.com/shiki@0.10.1/');

// requires: <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs/loader.min.js"></script>
// const monaco = await new Promise((resolve, reject) => {
// 	require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.26.1/min/vs' }});
// 	require(["vs/editor/editor.main"], () => resolve(window.monaco));
// });

async function highlighted(code){
	// const theme = 'dark-plus';
	const theme = 'css-variables';
	const langs = ['js'];
	const highlighter = await shiki.getHighlighter({ theme, langs })
	return highlighter.codeToHtml(code, 'js') +
`<pre class="shiki">
<code>
<span class="line"></span>
<span class="line"></span>
</code>
</pre>`;
}

function createElementFromHTML(htmlString) {
	var div = document.createElement("div");
	div.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	return div.firstChild;
}

export default async function constructLayer({ number, goFn, cancelFn, name, def, type } = {}) {
	const isEditing = Boolean(name && type && typeof def === "string");
	const container = createElementFromHTML(`
		<div id="layer-create">
			<div id="topBar">
				<div>
					<label>Name</label>
					<input 
						type="text"
						id="layerName"
						placeHolder="Enter Layer Name"
						${isEditing ? "disabled" : ""}
					/>
				</div>
				<div>
					<label>Type</label>
					<select id="layerType"${isEditing ? "disabled" : ""} value="${type}">
						<option value="2d">2D Canvas</option>
						<option value="webgl">3D Canvas</option>
						<option value="image">Image</option>
						<option value="svg">SVG</option>
					</select>
				</div>
			</div>

			${isEditing ? "" : `<div class="tabBar"></div>`}

			<div id="layerDefContainer">
				<div
					id="layerDef"
					contenteditable="true"
					autocomplete="off" autocorrect="off"
					autocapitalize="off" spellcheck="false"
					class="language-js"
				>
				</div>
			</div>

			<div id="bottomBar">
				<div class="buttonContainer">
					<button id="layerAddCancel">Cancel</button>
				</div>
				<div class="buttonContainer">
					<button id="layerAddSubmit">${isEditing ? "Update" : "Add"} Layer</button>
				</div>
			</div>
		</div>
	`);
	const getChildId = container.querySelector;

	const layerName = container.querySelector("#layerName");
	const layerType = container.querySelector("#layerType");
	const layerDef = container.querySelector("#layerDef");
	const layerAddCancel = container.querySelector("#layerAddCancel");
	const layerAddSubmit = container.querySelector("#layerAddSubmit");
	const tabBar = container.querySelector(".tabBar");

	const editorHTML = async (code) => {
		// monaco.editor.create(layerDef, {
		// 	value: code.trim(),
		// 	language: 'javascript',
		// 	theme: 'vs-dark',
		// });
		layerDef.innerHTML = await highlighted(code.trim());
		//layerDef.innerHTML = `<textarea>${code.trim()}</textarea>`;
	};
	// layerDef.addEventListener("input", async function(e) {
	// 	layerDef.innerHTML = await highlighted(e.target.textContent);
	// }, false);

	const examples = getExamples();
	const defaultExample = isEditing ? null : "smiley";
	const code = isEditing
		? def
		: examples[defaultExample];
	await editorHTML(code);

	layerName.value = name || defaultExample;

	!isEditing && Object.keys(examples)
		.forEach((key) => {
			var tabItem = createElementFromHTML(
				`<div class="tab${
					key === defaultExample ? " active" : ""
				} optionButton">${key}</div>`
			);
			tabItem.onclick = async (e) => {
				container.querySelector(".tab.active").classList.remove("active");
				e.target.classList.add("active");
				await editorHTML(examples[key]);
				layerName.value = key;
				layerType.value = key === 'webgl'
					? 'webgl'
					: '2d';
			};
			tabBar.appendChild(tabItem);
		});
	layerType.value = type === 'webgl' || defaultExample === 'webgl'
		? 'webgl'
		: '2d';

	layerAddCancel.onclick = cancelFn;
	layerAddSubmit.onclick = () => {
		goFn(
			isEditing ? 'layer-update' : 'layer-add',
		{
			number,
			name: layerName.value,
			type: layerType.value,
			def: layerDef.textContent
		});
	};

	return container;
}
