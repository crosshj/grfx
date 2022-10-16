const examples = {
	dunno: "https://raw.githubusercontent.com/crosshj/graphics-editor/main/assets/feedforward.png",
	robot: "https://images.nightcafe.studio/jobs/wJMbnnlCfS9WEVur80Qx/wJMbnnlCfS9WEVur80Qx_8.9286x.jpg",
	squid: "https://images.nightcafe.studio/jobs/gZVKddsDrWb2odrM3vsY/gZVKddsDrWb2odrM3vsY--2--Y98HJ.jpg",
	gold: "https://images.nightcafe.studio/jobs/7OXU5TcnbVF71K1zN79N/7OXU5TcnbVF71K1zN79N--3--5TQRK.jpg",
	owl: "https://images.nightcafe.studio/jobs/5freDC2naZa9EQrIUOQY/5freDC2naZa9EQrIUOQY.jpg",
	sky: "https://images.nightcafe.studio/jobs/lheEUAmhcoUn9fsxXGZP/lheEUAmhcoUn9fsxXGZP_6.9444x.jpg",
};

const basicCanvas = `
	const { width, height } = getDims();
	const radius = width*.2;
	const Xcenter = width/2;
	const Ycenter = height/2 - 70;
	ctx.fillStyle = '#e0a';
	ctx.arc(Xcenter, Ycenter, radius, 0, 2*Math.PI, false);
	ctx.fill();



	const omg = 'ꙭ ꙮ꙯꙰꙱꙲  ꙳ꙴꙵꙶꙷꙸꙹꙺꙻ꙼꙽ ꙾ ꙿ';
	const kanji = ' 丳 临 丵 丧 乶 不 擄 ㍼ 书';
	const braille = "⠁ ⠂ ⠃ ⠄ ⠅ ⠆ ⠇ ⠈ ⠉ ⠊ ⠋ ⠌ ⠍ ⠎ ⠏ ⠐ ⠑ ⠒ ⠓ ⠔ ⠕ ⠖ ⠗ ⠘ ⠙ ⠚ ⠛ ⠜ ⠝ ⠞ ⠟ ⠠ ⠡ ⠢ ⠣ ⠤ ⠥ ⠦ ⠧ ⠨ ⠩ ⠪ ⠫ ⠬ ⠭ ⠮ ⠯ ⠰ ⠱ ⠲ ⠳ ⠴ ⠵ ⠶ ⠷ ⠸ ⠹ ⠺ ⠻ ⠼ ⠽ ⠾ ⠿ ⡀ ⡁ ⡂ ⡃ ⡄ ⡅ ⡆ ⡇ ⡈ ⡉ ⡊ ⡋ ⡌ ⡍ ⡎ ⡏ ⡐ ⡑ ⡒ ⡓ ⡔ ⡕ ⡖ ⡗ ⡘ ⡙ ⡚ ⡛ ⡜ ⡝ ⡞ ⡟ ⡠ ⡡ ⡢ ⡣ ⡤ ⡥ ⡦ ⡧ ⡨ ⡩ ⡪ ⡫ ⡬ ⡭z";
	const indic = 'ﶝﶞ ﶟ ﶢ ﶣ ﶤ ﶥ ﶩ ﶯ ';
	const blocks ='▒ ▓ ▒ ▒ ▓ ▒ ▒ ▒ ▓ ▒ ▒ ▒ ▓ ▒ ▓ ▒ ▒ ▒ ▓ ▒ ▒ ▒ ▓ ▒ ▒ ▒ ▒ ▒';
	const cool = ' ☫ 〄 〠 ☬  〯 ☫ ㉲ ☬ ༖ ☫ ☬ ☫ ☬';
	const tibetan = 'ༀ ༁ ༂ ༃ ༄ ༅ ༆ ༇ ༈ ༉ ༊ ་ ༌ ། ༎ ༏ ༐ ༑ ༒ ༓ ༔ ༕ ༖ ༗ ༘ ༙ ༚ ༛ ༜ ༝ ༞ ༟ ༠ ༡ ༢ ༣ ༤ ༥ ༦ ༧ ༨ ༩ ༪ ༫ ༬ ༭ ༮ ༯ ༰ ༱ ༲ ༳ ༴ ༵ ༶ ༷ ༸ ༹ ༺ ༻ ༼ ༽ ༾ ༿ ཀ ཁ ག གྷ ང ཅ ཆ ཇ ཉ ཊ ཋ ཌ ཌྷ ཎ ཏ ཐ ད དྷ ན པ ཕ བ བྷ མ ཙ ཚ ཛ ཛྷ ཝ ཞ ཟ འ ཡ ར ལ ཤ ཥ ས ཧ ཨ ཀྵ ཱ ི ཱི ུ ཱུ ྲྀ ཷ ླྀ ཹ ེ ཻ ོ ཽ ཾ ཿ ྀ ཱྀ ྂ ྃ ྄ ྅ ྆ ྇ ';
	const tamil = 'ஂ ஃ அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஜ ஞ ட ண த ந ன ப ம ய ர ற ல ள ழ வ ஷ ஸ ஹ ா ி ீ ு ூ ெ ே ை ொ ோ ௌ ் ௗ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯ ௰ ௱ ௲';

	function RNG(seed) {
		var m_as_number = 2**53 - 111
		var m = 2n**53n - 111n
		var a = 5667072534355537n
		var s = BigInt(seed) % m
		return function () {
			return Number(s = s * a % m) / m_as_number
		}
	}
	// var val = Date.now();
	// console.log(val);
	//1663621046135
	//1663621109690
	//1663621152890
	//1663621172223
	const pseudoRandom = RNG(1663621172223);

	const random = (source) => () => source.split(' ').sort(() => 0.5 - pseudoRandom())[0];
	const getRandom = (number, lang) => [...Array(number)].map(random(lang)).join('');

	ctx.fillStyle = '#992b99';
	ctx.font = width*0.1 + 'px sans-serif';
	ctx.fillText(getRandom(26, tibetan), 0, height-(width*0.06), width);


`.replace(/^\t/gm, '');

const speech = `
	const { width, height } = getDims();
	ctx.filter = 'invert(1)';
	await ops.speech({
		text: \`
			An old silent pond
			A frog jumps into the pond--
			Splash! Silence again.
		\`,
		x: width/2 +10,
		y: height/2 -300,
		radius: 5,
		scale: 1,
		distort: 0.01,
		tailX: 0,
		tailY: 0,
	});

	await ops.speech({
		text: "Ribbit...",
		x: width/2 -270,
		y: height/2 -100,
		radius: 30,
		scale: 1,
		distort: 0.05,
		tailX: 50,
		tailY: 30,
	});

	await ops.speech({
		text: "Ribbit...",
		x: width/2+30,
		y: height/2 -40,
		radius: 30,
		scale: 1,
		distort: 0.03,
		tailX: -50,
		tailY: 30,
	});


`.replace(/^\t/gm, '');


export default {
	zoom: 0.3,
	width: 1024,
	height: 768,
	tool: "airbrush",
	layers: [{
		number: 0,
		name: "Speech",
		type: '2d',
		def: speech
	},{
		number: 1,
		name: "Basic Canvas Ops",
		selected: true,
		alpha: 0.6,
		blendMode: 'multiply',
		type: '2d',
		def: basicCanvas
	}, {
		number: 2,
		name: "Dangerous Clouds",
		visible: true,
		// alpha: 0.5,
		// blendMode: 'overlay',
		blendMode: 'screen',
		type: '2d',
		def: `
			const image = await loadImage("${examples.sky}");
			ctx.drawImage(image, ...getDims(image));
		`.replace(/^\t\t\t/gm, '')
	}, {
		number: 3,
		name: "Owl At Sea",
		alpha: 0.1,
		blendMode: 'saturation',
		type: '2d',
		def: `
			const image = await loadImage("${examples.owl}");
			ctx.drawImage(image, ...getDims(image));
		`.replace(/^\t\t\t/gm, '')
	}, {
		number: 4,
		name: "Golden Boy",
		visible: false,
		type: '2d',
		def: `
			const image = await loadImage("${examples.gold}");
			ctx.drawImage(image, ...getDims(image));
		`.replace(/^\t\t\t/gm, '')
	}, {
		number: 5,
		name: "Mon*star's Sky-Runner",
		type: '2d',
		def: `
			const image = await loadImage("${examples.squid}");
			ctx.drawImage(image, ...getDims(image));
		`.replace(/^\t\t\t/gm, '')
	}, {
		number: 6,
		name: "Cyberpunk Robot",
		type: '2d',
		def: `
			const image = await loadImage("${examples.robot}");
			ctx.drawImage(image, ...getDims(image));
		`.replace(/^\t\t\t/gm, '')
	}]
};
