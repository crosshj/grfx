import { describe, it, expect } from 'footils/test';
import actions from './actions.js';

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

describe('Filter Actions', () => {
	it('should binarize', async () => {
		const filterName = "menu-filter-binarize";
		const context = ContextMock({
			modalReturn: { binarizeAmount: 1 }
		});
		const actionResult = await actions[filterName](context);
		const layerDef = context.currentFile.layers[0].def;
		expect(layerDef.includes('ops.filter("Binarize", 1);')).toEqual(true);
	});
});
