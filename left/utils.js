// ripped parts from: https://github.com/jonnyhaynes/inline-svg
export const InlineSVG = async (src, id) => {
	const svgSrc = await fetch(src).then(x => x.text());
	const parser = new DOMParser();
	const result = parser.parseFromString(svgSrc, 'text/xml');
	const inlinedSVG = result.getElementsByTagName('svg')[0];
	inlinedSVG.removeAttribute('xmlns:a');
	inlinedSVG.removeAttribute('width');
	inlinedSVG.removeAttribute('height');
	inlinedSVG.removeAttribute('x');
	inlinedSVG.removeAttribute('y');
	inlinedSVG.removeAttribute('enable-background');
	inlinedSVG.removeAttribute('xmlns:xlink');
	inlinedSVG.removeAttribute('xml:space');
	inlinedSVG.removeAttribute('version');
	inlinedSVG.setAttribute('id', id);
	document.body.append(inlinedSVG);
};
