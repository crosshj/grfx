var cursor = document.querySelector('.cursor');

document.addEventListener('pointermove', function(e){
	cursor.style.left = e.clientX + 'px';
	cursor.style.top = e.clientY + 'px';
});

document.addEventListener('pointerleave', function(e){
	cursor.style.display = "none"
});
document.addEventListener('pointerenter', function(e){
	cursor.style.display = "";
});

export default {};
