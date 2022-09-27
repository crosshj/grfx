import { host as MessageHost } from '@grfx/messages';
import FileSystem from '@grfx/fs';

import fsConfig from './filesystem/.init.js';
import Hotkeys from './hotkeys/hotkeys.js';
import Core from './core/core.js';
import forms from './menus/forms.js';
import Layout from './layout/layout.js';

import Menus from './menus/menus.js';
//import Menus from 'https://beta.fiug.dev/dist/menus.js'

const config = await FileSystem.init({ config: fsConfig });

const layout = await Layout();
const host = MessageHost();
Hotkeys({ host });

const core = Core({ host, layout });
Menus({ forms });

core.load(config);
