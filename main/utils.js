export function getMousePos(canvas, evt) {
	if(!evt) return {};
	const { clientX, clientY } = evt;

	const ctx = canvas.getContext("2d");
	const rect = canvas.getBoundingClientRect(); // abs. size of element
	const scaleX = canvas.width / rect.width;    // relationship bitmap vs. element for X
	const scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

	const screenX = (clientX - rect.left) * scaleX;
	const screenY = (clientY - rect.top) * scaleY;
	const matrix = ctx.getTransform();
	const imatrix = matrix.invertSelf();
	const x = screenX * imatrix.a + screenY * imatrix.c + imatrix.e;
	const y = screenX * imatrix.b + screenY * imatrix.d + imatrix.f;

	return { x, y };
}
