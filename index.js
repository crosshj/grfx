import FileSystem from './shared/fs.js';
import fsConfig from './filesystem/.init.js';
import Core from './core/core.js';
import forms from './menus/forms.js';
import Menus from './menus/menus.js';
//import Menus from 'https://beta.fiug.dev/dist/menus.js'
import Layout from './layout/layout.js';
import { host as MessageHost } from './shared/messages.js';

await FileSystem.init({ config: fsConfig });

const layout = await Layout();
const host = MessageHost();

Core({ host, layout });
Menus({ forms });
