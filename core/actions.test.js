import { describe, it, expect } from 'footils/test';
import actions from './actions.js';

const layerDef = `
const image = await loadImage("1665973911179.png");
ctx.drawImage(
	image,
	0,0, image.width, image.height,
	1024/2 - image.width/2,
	768/2 - image.width/2,
	image.width, image.height
);
`;

const ContextMock = ({ modalReturn }) => {
	const context = {
		currentFile: {
			layers: [{
				selected: true,
				type: '2d',
				def: ``
			}]
		},
		update: () => {},
		state: {
			layer: {
				update: () => {}
			}
		},
		ShowModal: () => () => ({ form: modalReturn })
	};
	return context;
}

describe('Filter Statements in Layer Definition', () => {
	it('should add blur', async () => {
		const filterName = "menu-filter-blur";
		const context = ContextMock({
			modalReturn: { blurAmount: 1 }
		});
		const actionResult = await actions[filterName](context);
		const layerDef = context.currentFile.layers[0].def;
		expect(layerDef.includes('ops.filter("StackBlur", 1);')).toEqual(true);
	});
	it('should add sharpen', async () => {
		const filterName = "menu-filter-sharpen";
		const context = ContextMock({
			modalReturn: { sharpenAmount: 1 }
		});
		const actionResult = await actions[filterName](context);
		const layerDef = context.currentFile.layers[0].def;
		expect(layerDef.includes('ops.filter("Sharpen", 1);')).toEqual(true);
	});
	it('should add pixelate', async () => {
		const filterName = "menu-filter-pixelate";
		const context = ContextMock({
			modalReturn: { pixelateAmount: 1 }
		});
		const actionResult = await actions[filterName](context);
		const layerDef = context.currentFile.layers[0].def;
		expect(layerDef.includes('ops.filter("Mosaic", 1);')).toEqual(true);
	});
	it('should add rescale', async () => {
		const filterName = "menu-filter-rescale";
		const context = ContextMock({
			modalReturn: { rescaleAmount: 1 }
		});
		const actionResult = await actions[filterName](context);
		const layerDef = context.currentFile.layers[0].def;
		expect(layerDef.includes('ops.filter("Rescale", 1);')).toEqual(true);
	});
	it('should add dither', async () => {
		const filterName = "menu-filter-dither";
		const context = ContextMock({
			modalReturn: { ditherAmount: 1 }
		});
		const actionResult = await actions[filterName](context);
		const layerDef = context.currentFile.layers[0].def;
		expect(layerDef.includes('ops.filter("Dither", 1);')).toEqual(true);
	});
	it('should add binarize', async () => {
		const filterName = "menu-filter-binarize";
		const context = ContextMock({
			modalReturn: { binarizeAmount: 1 }
		});
		const actionResult = await actions[filterName](context);
		const layerDef = context.currentFile.layers[0].def;
		expect(layerDef.includes('ops.filter("Binarize", 1);')).toEqual(true);
	});
	it('should add edge', async () => {
		const filterName = "menu-filter-edge";
		const context = ContextMock({
			modalReturn: { edgeAmount: 1 }
		});
		const actionResult = await actions[filterName](context);
		const layerDef = context.currentFile.layers[0].def;
		expect(layerDef.includes('ops.filter("Edge");')).toEqual(true);
	});
});
