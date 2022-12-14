import Menus from '@fiug/menus'
import { host as MessageHost } from '@grfx/messages';
import { host as Hotkeys } from '@grfx/hotkeys';
import FileSystem from '@grfx/fs';

import hotkeyConfig from './config/hotkeys.config.js';
import fsConfig from './config/fs.config.js';

import Core from './core/core.js';
import forms from './menus/forms.js';
import Layout from './layout/layout.js';


await FileSystem.init({ config: fsConfig });

const layout = await Layout();
const host = MessageHost();

const onKey = (result) => {
	// TODO: connect this to a message firer
	console.log('HOTKEY: ' + result.name)
};
Hotkeys({ host, onKey, config: hotkeyConfig });

const core = Core({ host, layout });
Menus({ forms });

core.load(sessionStorage.getItem('grfxCurrentFilename') || 'example3d2.js');
