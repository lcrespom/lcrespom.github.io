$(_ => {
	$('#notation').on('input', evt => render($(evt.target).val()));
	$('.algorithm_item').on('click',
		evt => updateInput($(evt.currentTarget).find('p').text())
	);
});

function updateInput(txt) {
	$('#notation').val(txt);
	render(txt);
	window.scrollTo(0, 0);
}


//-------------------- Diagram rendering --------------------

function render(notation) {
	let $err = $('#error_msg');
	$err.html('&nbsp;');
	let canvas = document.getElementById('diagram');
	let ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	try {
		let turns = parseTurns(notation);
		renderTurns(turns, ctx, canvas.width);
	}
	catch (e) {
		$err.html('<b>Error</b>: ' + e);
	}
}

const CUBE_SEP = 80;
const CUBE_PIECE_SIZE = 20;
const CUBE_BORDER = 10;

function renderTurns(turns, ctx, width) {
	let x = CUBE_BORDER;
	let y = CUBE_BORDER;
	for (let turn of turns) {
		if (lineSepChar(turn)) {
			if (x > CUBE_SEP) {
				x = CUBE_BORDER;
				y += CUBE_SEP;
			}
		}
		else {
			renderCube(ctx, x, y);
			renderArrow(ctx, x, y, turn);
			x += CUBE_SEP;
			if (x + CUBE_SEP + CUBE_BORDER > width) {
				x = CUBE_BORDER;
				y += CUBE_SEP;
			}
		}
	}
}

function lineSepChar(turn) {
    return '/[]()'.indexOf(turn) >= 0;
}

function renderCube(ctx, x, y) {
	const renderPiece =
		(ctx, x, y) => ctx.strokeRect(x, y, CUBE_PIECE_SIZE, CUBE_PIECE_SIZE);
	ctx.strokeStyle = '#888';
	ctx.beginPath();
	renderPiece(ctx, x, y);
	renderPiece(ctx, x + CUBE_PIECE_SIZE, y);
	renderPiece(ctx, x + 2 * CUBE_PIECE_SIZE, y);
	renderPiece(ctx, x, y + CUBE_PIECE_SIZE);
	renderPiece(ctx, x + CUBE_PIECE_SIZE, y + CUBE_PIECE_SIZE);
	renderPiece(ctx, x + 2 * CUBE_PIECE_SIZE, y + CUBE_PIECE_SIZE);
	renderPiece(ctx, x, y + 2 * CUBE_PIECE_SIZE);
	renderPiece(ctx, x + CUBE_PIECE_SIZE, y + 2 * CUBE_PIECE_SIZE);
	renderPiece(ctx, x + 2 * CUBE_PIECE_SIZE, y + 2 * CUBE_PIECE_SIZE);
	ctx.stroke();
}

function renderArrow(ctx, x, y, turn) {
	ctx.strokeStyle = '#00F';
	ctx.beginPath();
	switch (turn) {
		//----- Normal turns -----
		case "U": case "u":
			arrowLeft(ctx, x, y);
			if (turn == 'u') arrowLeft(ctx, x, y + CUBE_PIECE_SIZE);
			break;
		case "U'": case "u'":
			arrowRight(ctx, x, y);
			if (turn == "u'") arrowRight(ctx, x, y + CUBE_PIECE_SIZE);
			break;
		case "U2":
			arrowLeft(ctx, x, y - 3);
			arrowLeft(ctx, x, y + 3);
			break;
		case "D": case "d":
			arrowRight(ctx, x, y + 2 * CUBE_PIECE_SIZE);
			if (turn == "d") arrowRight(ctx, x, y + CUBE_PIECE_SIZE);
			break;
		case "D'": case "d'":
			arrowLeft(ctx,  x, y + 2 * CUBE_PIECE_SIZE);
			if (turn == "d'") arrowLeft(ctx, x, y + CUBE_PIECE_SIZE);
			break;
		case "D2":
			arrowLeft(ctx,  x, y + 2 * CUBE_PIECE_SIZE - 3);
			arrowLeft(ctx,  x, y + 2 * CUBE_PIECE_SIZE + 3);
			break;
		case "L": case "l":
			arrowDown(ctx, x, y);
			if (turn == "l") arrowDown(ctx, x + CUBE_PIECE_SIZE, y);
			break;
		case "L'": case "l'":
			arrowUp(ctx, x, y);
			if (turn == "l'") arrowUp(ctx, x + CUBE_PIECE_SIZE, y);
			break;
		case "L2":
			arrowUp(ctx, x - 3, y);
			arrowUp(ctx, x + 3, y);
			break;
		case "R": case "r":
			arrowUp(ctx, x + 2 * CUBE_PIECE_SIZE, y);
			if (turn == "r") arrowUp(ctx, x + CUBE_PIECE_SIZE, y);
			break;
		case "R'": case "r'":
			arrowDown(ctx, x + 2 * CUBE_PIECE_SIZE, y);
			if (turn == "r'") arrowDown(ctx, x + CUBE_PIECE_SIZE, y);
			break;
		case "R2":
			arrowUp(ctx, x + 2 * CUBE_PIECE_SIZE - 3, y);
			arrowUp(ctx, x + 2 * CUBE_PIECE_SIZE + 3, y);
			break;
		case "F":
			curlCW(ctx, x, y);
			break;
		case "F'":
			curlCCW(ctx, x, y);
			break;
		case "F2":
			curlCW(ctx, x - 3, y - 3);
			curlCW(ctx, x + 3, y + 3);
			break;
		//----- Middle layers -----
		case "M":
			arrowDown(ctx, x + CUBE_PIECE_SIZE, y);
			break;
		case "M'":
			arrowUp(ctx, x + CUBE_PIECE_SIZE, y);
			break;
		case "M2":
			arrowUp(ctx, x + CUBE_PIECE_SIZE - 3, y);
			arrowUp(ctx, x + CUBE_PIECE_SIZE + 3, y);
			break;
		case "E":
			arrowRight(ctx, x, y + CUBE_PIECE_SIZE);
			break;
		case "E'":
			arrowLeft(ctx, x, y + CUBE_PIECE_SIZE);
			break;
		case "E2":
			arrowRight(ctx, x, y + CUBE_PIECE_SIZE - 3);
			arrowRight(ctx, x, y + CUBE_PIECE_SIZE + 3);
			break;
		//----- Full cube -----
		case "X": case "x":
			arrowUp(ctx, x, y);
			arrowUp(ctx, x + CUBE_PIECE_SIZE, y);
			arrowUp(ctx, x + 2 * CUBE_PIECE_SIZE, y);
			break;
		case "X'": case "x'":
			arrowDown(ctx, x, y);
			arrowDown(ctx, x + CUBE_PIECE_SIZE, y);
			arrowDown(ctx, x + 2 * CUBE_PIECE_SIZE, y);
			break;
		case "Y": case "y":
			arrowLeft(ctx, x, y);
			arrowLeft(ctx, x, y + CUBE_PIECE_SIZE);
			arrowLeft(ctx, x, y + 2 * CUBE_PIECE_SIZE);
			break;
		case "Y'": case "y'":
			arrowRight(ctx, x, y);
			arrowRight(ctx, x, y + CUBE_PIECE_SIZE);
			arrowRight(ctx, x, y + 2 * CUBE_PIECE_SIZE);
			break;
	default:
			throw "Unsupported turn";
	}
	ctx.stroke();
}

function arrowLeft(ctx, x, y) {
	let hcps = CUBE_PIECE_SIZE / 2;
	x += hcps;
	y += hcps;
	ctx.moveTo(x + 2 * CUBE_PIECE_SIZE, y);
	x -= 4;
	ctx.lineTo(x, y);
	ctx.lineTo(x + 6 , y - 4);
	ctx.lineTo(x, y);
	ctx.lineTo(x + 6 , y + 4);
}

function arrowRight(ctx, x, y) {
	let hcps = CUBE_PIECE_SIZE / 2;
	x += hcps;
	y += hcps;
	ctx.moveTo(x, y);
	x += 2 * CUBE_PIECE_SIZE + 4;
	ctx.lineTo(x, y);
	ctx.lineTo(x - 6 , y - 4);
	ctx.lineTo(x, y);
	ctx.lineTo(x - 6 , y + 4);
}

function arrowUp(ctx, x, y) {
	let hcps = CUBE_PIECE_SIZE / 2;
	x += hcps;
	y += hcps;
	ctx.moveTo(x, y + 2 * CUBE_PIECE_SIZE);
	y -= 4;
	ctx.lineTo(x, y);
	ctx.lineTo(x - 4 , y + 6);
	ctx.lineTo(x, y);
	ctx.lineTo(x + 4 , y + 6);
}

function arrowDown(ctx, x, y) {
	let hcps = CUBE_PIECE_SIZE / 2;
	x += hcps;
	y += hcps;
	ctx.moveTo(x, y);
	y += 2 * CUBE_PIECE_SIZE + 4;
	ctx.lineTo(x, y);
	ctx.lineTo(x - 4 , y - 6);
	ctx.lineTo(x, y);
	ctx.lineTo(x + 4 , y - 6);
}

function curlCW(ctx, x, y) {
	arrowDown(ctx, x + 2 * CUBE_PIECE_SIZE, y);
	let hcps = CUBE_PIECE_SIZE / 2;
	x += hcps;
	y += hcps;
	ctx.moveTo(x, y + 2 * CUBE_PIECE_SIZE);
	ctx.lineTo(x, y);
	ctx.lineTo(x + 2 * CUBE_PIECE_SIZE, y);
}

function curlCCW(ctx, x, y) {
	arrowDown(ctx, x, y);
	let hcps = CUBE_PIECE_SIZE / 2;
	x += hcps;
	y += hcps;
	ctx.moveTo(x, y);
	ctx.lineTo(x + 2 * CUBE_PIECE_SIZE, y);
	ctx.lineTo(x + 2 * CUBE_PIECE_SIZE, y + 2 * CUBE_PIECE_SIZE);
}


//-------------------- Notation parser --------------------

function parseTurns(notation) {
	chars = removeBlanks(notation).split('');
	turns = [];
	let turn = '';
	for (let ch of chars) {
		if (turn == '') {
			if (!validTurn(ch))
				throw `Invalid character "${ch}"`;
			turn = ch;
		}
		else {
			if (validTurn(ch)) {
				turns.push(turn);
				turn = ch;
			}
			else {
				if (!validModifier(ch))
					throw `Invalid character "${ch}"`;
				turns.push(turn + ch);
				turn = '';
			}
		}
	}
	if (turn != '') turns.push(turn);
	return turns;
}

function removeBlanks(txt) {
	return txt.replace(/ /g, '');
}

function validTurn(ch) {
	return "UDLRFB/[](){}udlrMEXxYy".indexOf(ch) >= 0;
}

function validModifier(ch) {
	return ch == "'" || ch == '2';
}
