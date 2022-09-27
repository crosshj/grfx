import { listen, send } from '@grfx/messages';
import Menus from '@grfx/menus';
import { client as Hotkeys } from '@grfx/hotkeys';

Hotkeys();

Menus.setOffsets(0, 0);
Menus.attach();

listen("contextmenu-select", Menus.menuSelect);
