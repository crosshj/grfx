import vertShader from './vertShader.gl.js';
import fragShader from './fragShader.gl.js';
import glAdvanced from './webgl-advanced.js';

const smiley = `
const { width, height } = getDims();
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
const { width, height } = getDims();
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
const { width, height } = getDims();
const canvasText = 'hello GRFX!';
ctx.font = 'bold 120px sans-serif';
ctx.fillStyle = '${colors[Math.floor(Math.random() * colors.length)]}';
ctx.fillText(canvasText, 20, height/2, width);
`.trim();

const circle = `
const { width, height } = getDims();
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
// see also https://webglfundamentals.org/webgl/lessons/webgl-shadertoy.html

var gl = ctx;

const vertices = [
	-1, -1,  // first triangle
	 1, -1,
	-1,  1,
	-1,  1,  // second triangle
	 1, -1,
	 1,  1,
]

var vertex_buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

var vertCode = \`
	attribute vec4 a_position;
	void main(void) {
		gl_Position = a_position;
	}
\`;
var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

var fragCode = \`
	precision highp float;
	uniform vec2 u_resolution;

	void main(void) {
		//gl_FragColor = vec4(fract(gl_FragCoord.xy / 600.0), 0, \${alpha});
		gl_FragColor = vec4(fract(gl_FragCoord.xy / u_resolution), 0, \${alpha});
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

var coord = gl.getAttribLocation(shaderProgram, "a_position");
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

const resolutionLocation = gl.getUniformLocation(shaderProgram, "u_resolution");
gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

//gl.clearColor(0.0, 0.0, 0.0, 0.0);
//gl.enable(gl.DEPTH_TEST);
//gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.TRIANGLES, 0, vertices.length/2);
`;
	//.concat(document.getElementById("gl-function").text);

export default () => ({
	blank: 'const { width, height } = getDims();\n\n',
	circle,
	octagon,
	smiley,
	square,
	text,
	triangle,
	webgl,
	webgl2: glAdvanced
});