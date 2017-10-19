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
	switch (turn.toUpperCase()) {
		case "U":
			arrowLeft(ctx, x, y);
			break;
		case "U'":
			arrowRight(ctx, x, y);
			break;
		case "U2":
			arrowLeft(ctx, x, y - 3);
			arrowLeft(ctx, x, y + 3);
			break;
		case "D":
			arrowRight(ctx, x, y + 2 * CUBE_PIECE_SIZE);
			break;
		case "D'":
			arrowLeft(ctx,  x, y + 2 * CUBE_PIECE_SIZE);
			break;
		case "D2":
			arrowLeft(ctx,  x, y + 2 * CUBE_PIECE_SIZE - 3);
			arrowLeft(ctx,  x, y + 2 * CUBE_PIECE_SIZE + 3);
			break;
		case "L":
			arrowDown(ctx, x, y);
			break;
		case "L'":
			arrowUp(ctx, x, y);
			break;
		case "L2":
			arrowUp(ctx, x - 3, y);
			arrowUp(ctx, x + 3, y);
			break;
		case "R":
			arrowUp(ctx, x + 2 * CUBE_PIECE_SIZE, y);
			break;
		case "R'":
			arrowDown(ctx, x + 2 * CUBE_PIECE_SIZE, y);
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
	return "udlrfb/[]()".indexOf(ch.toLowerCase()) >= 0;
	//TODO: make it case sensitive to support 2-layer rotations
	//TODO: Middle, Equator, Standing, X, Y, Z, and all 2 layer rotations
}

function validModifier(ch) {
	return ch == "'" || ch == '2';
}
