function createElementFromHTML(htmlString) {
	var div = document.createElement("div");
	div.innerHTML = htmlString.trim();

	// Change this to div.childNodes to support multiple top-level nodes
	return div.firstChild;
}

export default function constructLayer(goFn, cancelFn, { name, def, type } = {}) {
	//debugger
	return alert('WIP');
	const isEditing = Boolean(name && type && typeof def === "string");
	const container = createElementFromHTML(`
			<div id="layer-create">
					<div id="topBar">
							<div>
									<label>Name</label>
									<input type="text" id="layerName" placeHolder="Enter Layer Name"/>
							</div>
							<div>
									<label>Type</label>
									<select id="layerType"${isEditing ? "disabled" : ""}>
											<option>2D Canvas</option>
											<option>3D Canvas</option>
											<option>Image</option>
											<option>SVG</option>
									</select>
							</div>
					</div>

					${isEditing ? "" : `<div class="tabBar"></div>`}

					<textarea id="layerDef"
							autocomplete="off" autocorrect="off"
							autocapitalize="off" spellcheck="false"
					></textarea>

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

	if (isEditing) {
		layerDef.classList.add("full");
	}

	const smiley = [
		"var centerX = width / 2;",
		"var centerY = height / 2;",
		"var radius = 70;",
		"var eyeRadius = 10;",
		"var eyeXOffset = 25;",
		"var eyeYOffset = 20;",

		"\n// face",
		"ctx.beginPath();",
		"ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);",
		"ctx.fillStyle = 'yellow';",
		"ctx.fill();",
		"ctx.lineWidth = 3;",
		"ctx.strokeStyle = 'black';",
		"ctx.stroke();",

		"\n// eyes",
		"ctx.beginPath();",
		"var eyeX = centerX - eyeXOffset;",
		"var eyeY = centerY - eyeXOffset;",
		"ctx.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);",
		"var eyeX = centerX + eyeXOffset;",
		"ctx.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);",
		"ctx.fillStyle = 'black';",
		"ctx.fill();",

		"\n// mouth",
		"ctx.beginPath();",
		"ctx.arc(centerX, centerY+7, 25, Math.PI, 2*Math.PI, false);",
		"ctx.stroke();",
	].join("\n");

	const colors = ["red", "orange", "yellow", "green", "indigo", "violet"];

	const getNgonCode = (sides) =>
		[
			`const numberOfSides = ${sides};`,
			"const size = 200;",
			"Xcenter = width / 2;",
			"Ycenter = height / 2",
			`ctx.fillStyle = '${colors[Math.floor(Math.random() * colors.length)]}';`,

			"\nctx.beginPath();",
			"const rotateOffset = (numberOfSides % 2 ? 0.5 : 1) * Math.PI / numberOfSides;",
			"ctx.moveTo (",
			"   Xcenter +  size * Math.cos(0 + rotateOffset),",
			"   Ycenter +  size *  Math.sin(0 + rotateOffset)",
			");",

			"\n(new Array(numberOfSides)).fill().forEach((x, i) => {",
			"   j = i + 1;",
			"   ctx.lineTo(",
			"       Xcenter + size * Math.cos(j / numberOfSides * 2 * Math.PI + rotateOffset),",
			"       Ycenter + size * Math.sin(j / numberOfSides * 2 * Math.PI + rotateOffset)",
			"   );",
			"});",

			"\nctx.fill();",
		].join("\n");

	const triangle = getNgonCode(3);
	const square = getNgonCode(4);
	const octagon = getNgonCode(8);

	const text = [
		"const canvasText = 'hello sidebar';",
		"ctx.font = 'bold 120px sans-serif';",
		`ctx.fillStyle = '${colors[Math.floor(Math.random() * colors.length)]}';`,
		"ctx.fillText(canvasText, 20, height/2, width);",
	].join("\n");

	const circle = [
		"const radius = 300;",
		"const Xcenter = width/2;",
		"const Ycenter = height/2;",
		"ctx.font = 'bold 120px sans-serif';",
		`ctx.fillStyle = '${colors[Math.floor(Math.random() * colors.length)]}';`,
		"ctx.arc(Xcenter, Ycenter, radius, 0, 2*Math.PI, false);",
		"ctx.fill();",
	].join("\t\n");

	const webgl = [
		"// example modded from - https://www.tutorialspoint.com/webgl/webgl_sample_application.htm",
		"",
		"// shaders source code",
		`var vertCode = \`${window.vertexShaderSource}\`;`,
		`var fragCode = \`${window.fragmentShaderSource}\`;`,
		"",
	]
		.join("\n");
		//.concat(document.getElementById("gl-function").text);

	const examples = {
		webgl,
		triangle,
		square,
		octagon,
		circle,
		smiley,
		text,
	};

	const defaultExample = isEditing ? null : "webgl";
	layerDef.value = isEditing ? def : examples[defaultExample];
	layerName.value = name || defaultExample;
	layerType.value = type || "3D Canvas";

	!isEditing &&
		Object.keys(examples).forEach((key) => {
			var tabItem = createElementFromHTML(
				`<div class="tab${
					key === defaultExample ? " active" : ""
				}">${key}</div>`
			);
			tabItem.onclick = (e) => {
				container.querySelector(".tab.active").classList.remove("active");
				e.target.classList.add("active");
				layerDef.value = examples[key];
				layerName.value = key;
				// TODO: also change text of layerDef and name and type !!
			};
			tabBar.appendChild(tabItem);
		});

	layerAddCancel.onclick = () => {
		document.getElementById("sidebar").removeChild(container);
		cancelFn();
	};
	layerAddSubmit.onclick = () => {
		goFn({
			// build canvas function here
			def: parseFunction(`function({ ctx, gl, alpha, width, height}){
																${container.querySelector("#layerDef").value}
														}`),
			name: container.querySelector("#layerName").value || "New Layer",
			type: container.querySelector("#layerType").value,
		});
		document.getElementById("sidebar").removeChild(container);
	};

	document.getElementById("sidebar").appendChild(container);
}
