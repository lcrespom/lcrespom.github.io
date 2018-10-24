$(function() {

	//-------------------- Calendar panel --------------------

	MONTHS = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December'
	]
	WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

	function daysInMonth(month, year) {
		return new Date(year, month + 1, 0).getDate()
	}

	function dayOfWeek(date) {
		let dow = date.getDay()
		if (dow == 0) dow = 7	// Adjust week to Mon ... Sun pattern
		return dow - 1
	}

	function getMonthWeeks(month, year) {
		let dim = daysInMonth(month, year)
		let dow = dayOfWeek(new Date(year, month, 1))
		return Math.ceil((dim + dow) / 7)
	}

	function fillCalendarCells($month, mnum, year) {
		let totalDays = getMonthWeeks(mnum, year) * 7
		let daynum = 1 - dayOfWeek(new Date(year, mnum, 1))
		let dim = daysInMonth(mnum, year)
		for (let i = 1; i <= totalDays; i++) {
			let $daycell = $('<div class="cal-day"></div>')
			if (daynum > 0 && daynum <= dim) {
				id = `day-${year}-${mnum + 1}-${daynum}`
				$daycell.append(
					`<div class="cal-cell" id="${id}">${daynum}</div></div>`
				)
			}
			else
				$daycell.addClass('cal-empty')
			daynum++
			$month.append($daycell)
		}
	}

	function addCalendar($cal, name, mnum, year) {
		let $month = $('<div class="cal-month"></div>')
		for (let weekday of WEEKDAYS)
			$month.append(`<span class="cal-weekday">${weekday}</span>`)
		fillCalendarCells($month, mnum, year)
		let $mblock = $(`
			<div class="cal-month-block">
				<h2>${name}</h2>
			</div>
		`)
		$mblock.append($month)
		$cal.append($mblock)
	}

	//-------------------- Event handling --------------------

	function form2event($inputs) {
		let getv = i => $inputs.get(i).value
		return {
			name: getv(0),
			color: getv(1),
			start: getv(2),
			duration: parseInt(getv(3)),
			every: parseInt(getv(4)),
			repeat: parseInt(getv(5))
		}
	}

	function event2form(event, $inputs) {
		let setv = (i, v) => $inputs.get(i).value = v
		setv(0, event.name)
		setv(1, event.color)
		setv(2, event.start)
		setv(3, event.duration)
		setv(4, event.every)
		setv(5, event.repeat)
	}

	function getEventsFromUI() {
		let events = []
		$('.cal-event-inputs').each((i, e) => {
			let $inputs = $(e).find('input')
			let event = form2event($inputs)
			if (isValidEvent(event))
				events.push(setEventDefaults(event))
		})
		return events
	}

	function updateCalendar() {
		let events = getEventsFromUI()
		$('#calendar').find('.cal-event').remove()
		for (let event of events)
			addEventToCalendar(event, $('#calendar'))
		location.hash = '#' + events2hash(events)
	}

	function addEventToCalendar(evt, $cal) {
		let event = Object.assign({}, evt)
		let startDate = new Date(event.start)
		let today = new Date()
		for (let i = 0; i < event.repeat; i++) {
			let d = new Date(startDate.getTime())
			for (let j = 0; j < event.duration; j++) {
				let $cell = getCellForDay(d, $cal)
				if (!$cell && d.getTime() > today.getTime()) return
				addEventToCell(event, $cell)
				d.setDate(d.getDate() + 1)
			}
			startDate.setDate(startDate.getDate() + event.every)
		}
	}

	function addEventToCell(event, $cell) {
		$evt = $(`<div class="cal-event">${event.name}</div>`)
		$evt.css('background-color', event.color)
			.css('color', event.txtcolor)
		$cell.append($evt)
	}

	function getCellForDay(d, $cal) {
		let yy = d.getFullYear()
		let mm = d.getMonth() + 1
		let dd = d.getDate()
		return $cal.find(`#day-${yy}-${mm}-${dd}`)
	}

	function isValidEvent(e) {
		return e.name && e.color && e.start
	}

	function setEventDefaults(e) {
		if (!e.duration) e.duration = 1
		if (!e.every) e.every = 1
		if (!e.repeat) e.repeat = 1	// Could default to "forever"
		e.txtcolor = getContrastingColor(e.color)
		return e
	}

	function events2hash(events) {
		let hash = ''
		for (let e of events)
			hash += '\\' + encodeURIComponent(e.name) +
				'|' + e.color + '|' + e.start +
				'|' + e.duration + '|' + e.every +
				'|' + e.repeat
		return hash.substr(1)
	}

	function hash2events() {
		let hash = decodeURIComponent(location.hash.substr(1))
		let sevts = hash.split('\\')
		let events = []
		for (let sevt of sevts) {
			edata = sevt.split('|')
			if (edata.length < 6) break
			events.push({
				name: decodeURI(edata[0]),
				color: edata[1],
				start: edata[2],
				duration: parseInt(edata[3]),
				every: parseInt(edata[4]),
				repeat: parseInt(edata[5]),
				txtcolor: getContrastingColor(edata[1])
			})
		}
		return events
	}

	function initEventsFromHash() {
		let events = hash2events()
		$('#event-list').empty()
		for (let event of events.reverse()) {
			let $inputs = addEventInputs().find('input')
			event2form(event, $inputs)
		}
		updateCalendar()
	}


	//-------------------- Event panel --------------------

	function setupEventPanel() {
		$('#cal-add-event').click(_ => addEventInputs())
	}

	function formGroup(label, type = 'text', value = '', after = '', attrs = {}) {
		let $group = $(`
		<div class="form-group">
			<label>${label}</label>
			<input type="${type}" value="${value}" class="form-control"/>
			${after}
		</div>
		`)
		let $input = $group.find('input')
		for (let attrName in attrs)
			$input.attr(attrName, attrs[attrName])
		return $group
	}

	function addEventInputs() {
		let $inputs = $(`<div class="cal-event-inputs"></div>`)
		$inputs
			.append('<hr/>')
			.append(formGroup('Name'))
			.append(formGroup('Color', 'color', randomColor()))
			.append(formGroup('Start', 'date', date2html(new Date())))
			.append(formGroup('Duration', 'number', '1', 'day(s)',
				{ min: 1, step: 1 }))
			.append(formGroup('Every', 'number', '', 'day(s)',
				{ min: 1, step: 1 }))
			.append(formGroup('Repeat', 'number', '', 'time(s)',
				{ min: 1, step: 1 }))
			.append(`<div class="form-group">
						<label />
						<button class="btn btn-sm btn-warning">Remove event</button>
					</div>`)
		$inputs.on('input', _ => updateCalendar())
		$inputs.find('button')
			.click(_ => $inputs.remove() && updateCalendar())
		$('#event-list').prepend($inputs)
		$inputs.find('input').get(0).focus()
		return $inputs
	}


	//-------------------- Misc utilities --------------------

	// Obtained from https://stackoverflow.com/a/9493060/2342681
	function hsl2rgb(h, s, l) {
		let r, g, b
		if (s == 0) {
			r = g = b = l // achromatic
		} else {
			let hue2rgb = (p, q, t) => {
				if (t < 0) t += 1
				if (t > 1) t -= 1
				if (t < 1 / 6) return p + (q - p) * 6 * t
				if (t < 1 / 2) return q
				if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
				return p
			}
			let q = l < 0.5 ? l * (1 + s) : l + s - l * s
			let p = 2 * l - q
			r = hue2rgb(p, q, h + 1 / 3)
			g = hue2rgb(p, q, h)
			b = hue2rgb(p, q, h - 1 / 3)
		}
		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
	}

	function rgb2hex(r, g, b) {
		let d2h = d => {
			let h = d.toString(16)
			return h.length > 1 ? h : '0' + h
		}
		return `#${d2h(r)}${d2h(g)}${d2h(b)}`
	}

	function randomColor() {
		let [r, g, b] = hsl2rgb(Math.random(), 1, 0.5)
		return rgb2hex(r, g, b)
	}

	function date2html(d) {
		return d.toISOString().split('T')[0]
	}

	function parseHexColor(hexcol) {
		let rgb = parseInt(hexcol.substr(1), 16)
		return [rgb & 255, rgb >> 8 & 255, rgb >> 16 & 255]
	}

	function isDarkColor(r, g, b) {
		let luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 256
		return luminance < 0.6
	}

	function getContrastingColor(color) {
		let [r, g, b] = parseHexColor(color)
		return isDarkColor(r, g, b) ? '#ffffff' : '#000000'
	}


	//-------------------- Main --------------------

	function main() {
		let today = new Date()
		let month = today.getMonth()
		let year = today.getFullYear()
		let $cal = $('#calendar')
		for (let i = 0; i < 12; i++) {
			let j = month + i
			if (j == 12) year++
			let mnum = j % 12
			let name = `${MONTHS[mnum]} ${year}`
			addCalendar($cal, name, mnum, year)
		}
		setupEventPanel()
		initEventsFromHash()
	}

	main()

})
