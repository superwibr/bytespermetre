!async function () {
	const canvas = document.querySelector("canvas");
	const ctx = canvas.getContext("2d");

	// % coords
	const
		width = canvas.width,
		height = canvas.height;
	const p = (xp, yp) => [xp / 100 * width, yp / 100 * height];

	// image loader
	const img = async src => {
		const d = new Image();
		d.src = src;
		await d.decode();
		return d;
	};

	// center image
	const cimage = (img, x, y, size, r) => {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(r * Math.PI / 180);
		ctx.translate(-x, -y);
		const sizey =size * img.height / img.width
		ctx.drawImage(img,
			x - size / 2,
			y - sizey / 2,
			size,
			sizey
		);
		ctx.restore();;
	}

	// load
	const imgs = {
		wheel: await img("../svg/wheel.svg")
	};

	// render
	let wheelDeg = 0;
	const render = function (amp) {
		ctx.fillRect(...p(10, 10), ...p(80, 80));

		// wheel spin
		wheelDeg += 13 * amp
		wheelDeg %= 360;
		cimage(imgs.wheel, ...p(50, 50), p(50)[0],wheelDeg);
	}

	// loop
	let tickTime = 100, loopTimestamp = Date.now();
	!async function loop() {
		const delta = Date.now() - loopTimestamp,
			amp = delta / tickTime;

		if (delta >= tickTime) {

			loopTimestamp = Date.now();
		};
		render(amp); // rendering with amplitude for fluidity

		requestAnimationFrame(loop);
	}();
}()