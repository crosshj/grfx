export default () => `
	precision mediump float;
	varying vec4 vColor;
	varying float vLight;

	void main(void) {
			gl_FragColor = vColor;
			gl_FragColor.rgb *= vLight;
	}
`.replace(/\t/g, '  ');
