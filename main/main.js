const canvas = document.querySelector('canvas');


// https://stackoverflow.com/a/66874077
const mouseStrength = 1.4;
const pinchStrength = 0.003;
let scale = 1.0;
canvas.addEventListener('wheel', (ev) => {
	ev.preventDefault();
	const isPinch = Math.abs(ev.deltaY) < 50;

	if (isPinch) {
		let factor = 1 - pinchStrength * ev.deltaY;
		scale *= factor;
		//console.log(`Pinch: scale is ${scale}`);
	} else {
		let factor = ev.deltaY < 0
			? mouseStrength
			: 1.0 / mouseStrength;
		scale *= factor;
		//console.log(`Mouse: scale is ${scale}`);
	}
	canvas.style.transform = `scale(${scale})`;
});