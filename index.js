import { host as MessageHost } from '@grfx/messages';
import { host as Hotkeys } from '@grfx/hotkeys';
import FileSystem from '@grfx/fs';

import hotkeyConfig from './config/hotkeys.config.js';
import fsConfig from './filesystem/.init.js';
import Core from './core/core.js';
import forms from './menus/forms.js';
import Layout from './layout/layout.js';

import Menus from './menus/menus.js';
//import Menus from 'https://beta.fiug.dev/dist/menus.js'

const config = await FileSystem.init({ config: fsConfig });

const layout = await Layout();
const host = MessageHost();

const onKey = (result) => {
	console.log(result.name)
};
Hotkeys({ host, onKey, config: hotkeyConfig });

const core = Core({ host, layout });
Menus({ forms });

core.load(config);
