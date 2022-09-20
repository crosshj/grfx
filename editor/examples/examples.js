import vertShader from './vertShader.gl.js';
import fragShader from './fragShader.gl.js';

const smiley = `
var centerX = width / 2;
var centerY = height / 2;
var radius = 70;
var eyeRadius = 10;
var eyeXOffset = 25;
var eyeYOffset = 20;

// face
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.lineWidth = 3;
ctx.strokeStyle = 'black';
ctx.stroke();

// eyes
ctx.beginPath();
var eyeX = centerX - eyeXOffset;
var eyeY = centerY - eyeXOffset;
ctx.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
var eyeX = centerX + eyeXOffset;
ctx.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
ctx.fillStyle = 'black';
ctx.fill();

// mouth
ctx.beginPath();
ctx.arc(centerX, centerY+7, 25, Math.PI, 2*Math.PI, false);
ctx.stroke();
`.trim();

const colors = ["red", "orange", "yellow", "green", "indigo", "violet"];

const getNgonCode = (sides) => `
const numberOfSides = ${sides};
const size = 200;
const Xcenter = width / 2;
const Ycenter = height / 2;
ctx.fillStyle = '${colors[Math.floor(Math.random() * colors.length)]}';

ctx.beginPath();
const sidesOffset = numberOfSides % 2
	? 0.5
	: 1;
const rotateOffset = sidesOffset * Math.PI / numberOfSides;
ctx.moveTo (
	Xcenter +  size * Math.cos(0 + rotateOffset),
	Ycenter +  size *  Math.sin(0 + rotateOffset)
);

(new Array(numberOfSides)).fill().forEach((x, i) => {
	const j = i + 1;
	const k = j / numberOfSides * 2 * Math.PI + rotateOffset;
	ctx.lineTo(
		Xcenter + size * Math.cos(k),
		Ycenter + size * Math.sin(k)
	);
});

ctx.fill();
`.trim();

const triangle = getNgonCode(3);
const square = getNgonCode(4);
const octagon = getNgonCode(8);

const text = `
const canvasText = 'hello GRFX!';
ctx.font = 'bold 120px sans-serif';
ctx.fillStyle = '${colors[Math.floor(Math.random() * colors.length)]}';
ctx.fillText(canvasText, 20, height/2, width);
`.trim();

const circle = `
const radius = 300;
const Xcenter = width/2;
const Ycenter = height/2;
ctx.font = 'bold 120px sans-serif';
ctx.fillStyle = '${colors[Math.floor(Math.random() * colors.length)]}';
ctx.arc(Xcenter, Ycenter, radius, 0, 2*Math.PI, false);
ctx.fill();
`.trim();

const webgl = `
// example modded from:
// https://www.tutorialspoint.com/webgl/webgl_sample_application.htm

// shaders
var vertCode = \`${vertShader()}\`;

var fragCode = \`${fragShader()}\`;
`;
	//.concat(document.getElementById("gl-function").text);

export default () => ({
	webgl,
	triangle,
	square,
	octagon,
	circle,
	smiley,
	text,
});