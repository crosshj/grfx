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

var gl = ctx;

var vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];
var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

var vertCode = \`
	attribute vec2 coordinates; 
	void main(void) {
		gl_Position = vec4(coordinates,0.0, 1.0);
	}
\`;
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

var fragCode = \`
	void main(void) {
		gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
	}
\`;
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader); 
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

gl.enableVertexAttribArray(coord);
gl.clearColor(0.5, 0.5, 0.5, 0.9);

gl.enable(gl.DEPTH_TEST); 
gl.clear(gl.COLOR_BUFFER_BIT);

gl.viewport(0,0, width, height);
gl.drawArrays(gl.TRIANGLES, 0, 3);


/*
var vertCode = \`${vertShader()}\`;

var fragCode = \`${fragShader()}\`;
*/
`;
	//.concat(document.getElementById("gl-function").text);

export default () => ({
	circle,
	octagon,
	smiley,
	square,
	text,
	triangle,
	webgl,
});