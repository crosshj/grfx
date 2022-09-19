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
	const radius = 300;
	const Xcenter = width/2;
	const Ycenter = height/2 - 60;
	ctx.fillStyle = '#e0a';
	ctx.arc(Xcenter, Ycenter, radius, 0, 2*Math.PI, false);
	ctx.fill();




	const omg = ' ꙭꙮ꙯꙰꙱꙲꙳ꙴꙵꙶꙷꙸꙹꙺꙻ꙼꙽꙾ꙿ';
	const kanji = ' 丳 临 丵 丧 乶 不 擄 ㍼ 书';
	const braille = "⠁⠂⠃⠄⠅⠆⠇⠈⠉⠊⠋⠌⠍⠎⠏⠐⠑⠒⠓⠔⠕⠖⠗⠘⠙⠚⠛⠜⠝⠞⠟⠠⠡⠢⠣⠤⠥⠦⠧⠨⠩⠪⠫⠬⠭⠮⠯⠰⠱⠲⠳⠴⠵⠶⠷⠸⠹⠺⠻⠼⠽⠾⠿⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭";
	const indic = 'ﶝﶞﶟﶢﶣﶤﶥﶩﶯ';
	const blocks ='▒▓▒▒▓▒▒▒▓▒▒▒▓▒▓▒▒▒▓▒▒▒▓▒▒▒▒▒';
	const cool = ' ☫〄〠☬ 〯☫㉲☬༖☫☬☫☬';
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
	ctx.font = 'bold 120px sans-serif';
	ctx.fillText(getRandom(26, tibetan), 0, height-80, width);
`;

export default {
	zoom: 0.6,
	width: 2880,
	height: 2160,
	layers: [{
		number: 0,
		alpha: 0.6,
		blendMode: 'multiply',
		name: "Basic Canvas Ops",
		def: basicCanvas
	}, {
		number: 1,
		visible: true,
		selected: true,
		// alpha: 0.5,
		// blendMode: 'overlay',
		blendMode: 'screen',
		name: "Dangerous Clouds",
		def: `
			const image = await loadImage("${examples.sky}");
			ctx.drawImage(image, ...getDims(image));
		`
	}, {
		number: 2,
		name: "Owl At Sea",
		alpha: 0.1,
		blendMode: 'saturation',
		def: `
			const image = await loadImage("${examples.owl}");
			ctx.drawImage(image, ...getDims(image));
		`
	}, {
		visible: false,
		number: 3,
		name: "Golden Boy",
		def: `
			const image = await loadImage("${examples.gold}");
			ctx.drawImage(image, ...getDims(image));
		`
	}, {
		number: 4,
		name: "Mon*star's Sky-Runner",
		def: `
			const image = await loadImage("${examples.squid}");
			ctx.drawImage(image, ...getDims(image));
		`
	}, {
		number: 5,
		name: "Cyberpunk Robot",
		def: `
			const image = await loadImage("${examples.robot}");
			ctx.drawImage(image, ...getDims(image));
		`
	}]
};
