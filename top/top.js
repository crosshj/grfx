import { listen } from '../shared/messages.js';
import Menus from '../menus/showMenus.js';
import { client as Hotkeys } from '../shared/hotkeys.js';
Hotkeys();

Menus.setOffsets(0, 0);
Menus.attach();

listen("contextmenu-select", Menus.menuSelect);
