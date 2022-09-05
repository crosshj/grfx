import Menus from '../menus/showMenus.js';

Menus.setOffsets(0, 0);
Menus.attach();
listen("contextmenu-select", Menus.menuSelect);
