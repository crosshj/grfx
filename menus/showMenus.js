let offsetLeft=0;
let offsetTop=0;

const setOffsets = (x,y) => {
	offsetLeft = x;
	offsetTop = y;
};

const menuSelect = (e) => {
	if(!window.selectListener) return;
	window.selectListener(e);
};

const getCoords = (elem) => {
	const box = elem.getBoundingClientRect();
	return {
		top: box.top + window.pageYOffset + offsetTop,
		right: box.right + window.pageXOffset + offsetLeft,
		bottom: box.bottom + window.pageYOffset + offsetTop,
		left: box.left + window.pageXOffset + offsetLeft
	};
}

const getMenuItems = (e) => {
	const children = e.target.children;
	return Array.from(children).map(child => {
		return { name: child.textContent };
	});
};

const showMenu = (e) => {
	e.preventDefault();
	const { bottom, left } = getCoords(e.target);

	const event = new CustomEvent('contextMenuShow', {
		bubbles: true,
		detail: {
			x: left,
			y: bottom,
			list: getMenuItems(e) || [],
			parent: "top-bar"
		}
	})
	window.selectListener = (selectEvent) => {
		if(selectEvent.which) e.target.value = selectEvent.which;
		window.selectListener = undefined;
	};
	window.top.dispatchEvent(event);
	return false;
};

const attach = () => {
	document.addEventListener('pointerdown', (e) => {
		const menu = e.target.dataset.menu;
		if(menu) return showMenu(e);
	});
};

const menus = {};
menus.setOffsets = setOffsets;
menus.menuSelect = menuSelect;
menus.attach = attach;

export default menus;
