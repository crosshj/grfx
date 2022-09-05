const listItems = [{
	name: "New File",
}, {
	name: "New Folder",
},
	"seperator",
{
	name: "Cut",
}, {
	name: "Copy",
}];

function getCoords(elem) {
	const offsetLeft = 0;
	const offsetTop = 25;
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
			list: getMenuItems(e) || listItems,
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

export default showMenu;
