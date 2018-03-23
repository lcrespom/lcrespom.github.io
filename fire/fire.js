class Fire {
	constructor(w, h) {
		this.data = new Int16Array(w * h)
		this.w = w
		this.h = h
	}

	step() {
		this.randomFloor()
		let w = this.w
		for (let y = this.h - 2; y >= 0; y--) {
			let start = w * y
			for (let i = start; i < start + w; i++)
				this.data[i] = (
					this.data[i] +
					this.data[i + w - 1] +
					this.data[i + w] +
					this.data[i + w + 1]
				) / 4.02
		}
	}

	randomFloor() {
		let start = this.w * (this.h - 1)
		let min = 0
		for (let i = start; i < start + this.w; i++)
			this.data[i] = min + Math.random() * (256 - min)
	}
}


class FirePalette {
	constructor() {
		this.stop = 64
		this.red = []
		for (let i = 0; i < 256; i++)
			this.red[i] = this.calcRed(i)
		this.green = []
		for (let i = 0; i < 256; i++)
			this.green[i] = this.calcGreen(i)
		this.blue = []
		for (let i = 0; i < 256; i++)
			this.blue[i] = this.calcBlue(i)
	}

	calcRed(n) {
		if (n > this.stop)
			return 256
		else
			return n * (256 / this.stop)
	}

	calcGreen(n) {
		n -= this.stop
		if (n > 0)
			return n * (256 / this.stop)
		else
			return 0
	}

	calcBlue(n) {
		return 0
	}
}


function drawAnimation(ctx, imgData, fire, palette) {
	for (let i = 0; i < fire.data.length; i++) {
		let j = i * 4
		let n = fire.data[i]
		imgData.data[j + 0] = palette.red[n]
		imgData.data[j + 1] = palette.green[n]
		imgData.data[j + 2] = palette.blue[n]
		imgData.data[j + 3] = n * 4//256
	}
	ctx.putImageData(imgData, 0, 2)
}


function drawLoop(cb) {
	window.requestAnimationFrame(_ => {
		cb()
		drawLoop(cb)
	})
}

function runAnimation(canvas, img) {
	let ctx = canvas.getContext('2d')
	if (img) ctx.drawImage(img, 0, 0)
	let w = canvas.width
	let h = canvas.height
	let fire = new Fire(w, h) // Max 128
	let palette = new FirePalette()
	let imgData = ctx.createImageData(w, h)
	let framect = 0
	drawLoop(timeData => {
		framect++
		if (framect % 3) return
		fire.step()
		drawAnimation(ctx, imgData, fire, palette)
	});
}

function loadImage(url) {
	return new Promise(resolve => {
		var img = document.getElementById('fire-image')
		img.src = url
		img.onload = _ => resolve(img)
		img.onerror = _ => resolve(false)
	})
}

function main() {
	let canvas = document.getElementById('fire-canvas')
	loadImage(location.search.substr(1))
	.then(img => {
		if (img) {
			canvas.width = img.offsetWidth
			canvas.height = img.offsetHeight
		}
		runAnimation(canvas, img)
	})
}


main()