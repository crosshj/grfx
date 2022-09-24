import { host as Hotkeys } from '../shared/hotkeys.js';
import config from './hotkeys-config.js';

const onKey = (key) => {
	let result;
	for(const [name, test] of Object.entries(config)){
		const thisResult = test(key);
		if(thisResult.some(x => !x)) continue;
		if(thisResult.length <= result?.length) continue;
		result = { name, length: thisResult.length };
	}
	result && console.log('TODO: ' + result.name)
};

export default ({ host }) => Hotkeys({ host, onKey });
