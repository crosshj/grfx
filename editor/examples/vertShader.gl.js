export default (alpha=1) => `
	attribute vec4 coordinates;
	attribute vec3 a_normal;

	varying vec4 vColor;
	varying float vLight;

	uniform mat4 u_matrix;
	uniform vec3 u_reverseLightDirection;

	float ambient = .3;

	void main(void) {
		gl_Position = coordinates * u_matrix;
		vColor = vec4(
			(coordinates[0] >= 0.0 && coordinates[1] >= 0.0) ||
			(coordinates[0] > 0.0 && coordinates[1] < 0.0)
				? 1.0
				: 0.0,
			(coordinates[0] <= 0.0 && coordinates[1] <= 0.0) ||
			(coordinates[0] > 0.0 && coordinates[1] < 0.0)
				? 1.0
				: 0.0,
			(coordinates[0] <= 0.0 && coordinates[1] >= 0.0)
				? 1.0
				: 0.0,
			${alpha}
		);
		vLight = ambient + dot(a_normal, u_reverseLightDirection);
	}
`.replace(/\t/g, '  ');