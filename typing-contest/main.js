/*
TODO:
- Flash error counter when error
- Afer #input_text changes, set #type_box height to same as #type_progress
*/
(function($){

let started = false
let pos = 0
let errorct = 0
let startTime = 0
let inputText = ''

function handleInputText() {
	$('#input_text').on('input', function() {
		started = false
		pos = 0
		errorct = 0
		updateStatErrors()
		$('#type_box').html('')
		inputText = $(this).val()
		$('#type_progress').text(inputText)
	})
}

function handleTypeBox() {
	$('#type_box').on('input', function() {
		if (!started) {
			started = true
			startTimer()
		}
		checkTyping(this.innerText)
	})
}

function checkTyping(text) {
	pos = text.length - 1
	let ch = text[pos]
	if (ch != inputText[pos]) {
		errorct++
		updateStatErrors()
		let tbox = $('#type_box').get(0)
		tbox.innerText = tbox.innerText.substr(0, pos)
		setCursorToEnd(tbox)
		pos--
		//TODO paint error in type_box
	}
	updateStatSpeed(pos)
}

function setCursorToEnd(target) {
	// Copied from https://stackoverflow.com/a/48384974/2342681
	let range = document.createRange();
	let sel = window.getSelection();
	range.selectNodeContents(target);
	range.collapse(false);
	sel.removeAllRanges();
	sel.addRange(range);
	target.focus();
	range.detach(); // optimization
	target.scrollTop = target.scrollHeight; // set scroll to the end if multiline
}

function updateStatTime() {
	$('#stat_time').text(formatTime(Date.now() - startTime))
}
function updateStatErrors() {
	$('#stat_errors').text(errorct)
}

function updateStatSpeed(len) {
	let elapsedMins = (Date.now() - startTime) / (60 * 1000)
	let kpm = len / elapsedMins
	$('#stat_speed').text(Math.round(kpm))
}

function startTimer() {
	startTime = Date.now()
	setInterval(_ => {
		if (!started) return
		updateStatTime()
	}, 1000)
}

function formatTime(millis) {
	let prepend0 = n => n < 10 ? '0' + n : n
	let secs = Math.floor(millis / 1000)
	let mins = Math.floor(secs / 60)
	secs = secs % 60
	return prepend0(mins) + ':' + prepend0(secs)
}

handleInputText()
handleTypeBox()

})(jQuery)
