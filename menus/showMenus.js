import handlebars from "@fiug/handlebars-esm";
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
};

const getMenuItems = (e) => {
	const items = [];
	const children = Array.from(e.target.children)
		.filter(x => {
			if(x.hidden) return false;
			if(x.tagName !== "OPTGROUP") return true;
			const groupChildren = Array.from(x.children)
				.filter(y => !y.hidden);
			if(groupChildren.length) return true;
			return false;
		});
	const MenuItem = (el, { disabled }={}) => ({
		name: el.textContent,
		key: el.value,
		disabled: el.disabled || disabled
	});

	for(const [i, child] of Object.entries(children)){
		const { disabled } = child;

		if(child.tagName !== "OPTGROUP"){
			items.push(MenuItem(child, { disabled }));
			continue;
		}

		const groupChildren = Array.from(child.children)
			.filter(x => !x.hidden);

		const previous = children[Number(i)-1];
		if(previous && previous.tagName !== "OPTGROUP" && Number(i)-1 >= 0){
			items.push("seperator");
		}
		for(const groupChild of groupChildren){
			items.push(MenuItem(groupChild, { disabled }));
		}
		if(Number(i)+1 === children.length) continue;
		if(items[items.length-1] === "seperator")
			continue;
		items.push("seperator");
	}
	return items;
};

let clicked;
const showMenu = (e, isClick) => {
	if(isClick) clicked = true;
	if(!clicked) return;

	e.preventDefault();
	const { bottom, left } = getCoords(e.target);

	const event = new CustomEvent('contextMenuShow', {
		bubbles: true,
		detail: {
			x: left,
			y: bottom - 30,
			list: getMenuItems(e) || [],
			parent: "top-bar"
		}
	});
	window.selectListener = (selectEvent) => {
		if(selectEvent.key){
			e.target.value = selectEvent.key;
			e.target.dispatchEvent(new Event("change"));
		}
		window.selectListener = undefined;
	};
	window.top.dispatchEvent(event);
	return false;
};

const attach = () => {
	document.addEventListener('pointerdown', (e) => {
		const menu = e.target.dataset.menu;
		if(menu) return showMenu(e, true);
	});
	const selectElements = Array.from(document.querySelectorAll('select'));
	for(const selectEl of selectElements){
		selectEl.addEventListener('mouseenter', (e) => {
			const menu = e.target.dataset.menu;
			if(menu) return showMenu(e);
		});
	}
};

const menus = {};
menus.setOffsets = setOffsets;
menus.menuSelect = menuSelect;
menus.attach = attach;

export default menus;
