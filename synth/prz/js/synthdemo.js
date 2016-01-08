function playSynthDemo() {
	var KB_NOTES = 'ZSXDCVGBHNJMQ2W3ER5T6Y7UI9O0P';
	var ac = new AudioContext();
	var json = {"nodes":[{"id":0,"x":540,"y":160,"name":"Out","inputs":[2],"classes":"node node-out"},{"id":1,"x":80,"y":40,"name":"Osc","inputs":[],"classes":"node node-src"},{"id":2,"x":380,"y":160,"name":"Gain","inputs":[4,5],"classes":"node node-effect"},{"id":3,"x":240,"y":40,"name":"LFO","inputs":[],"classes":"node node-ctrl"},{"id":4,"x":380,"y":40,"name":"Gain<br>Control","inputs":[3],"classes":"node node-ctrl"},{"id":5,"x":240,"y":160,"name":"Filter","inputs":[7],"classes":"node node-effect"},{"id":6,"x":80,"y":280,"name":"ADSR","inputs":[],"classes":"node node-ctrl"},{"id":7,"x":80,"y":160,"name":"Gain","inputs":[1,6],"classes":"node node-effect"}],"nodeData":[{"type":"out","params":{}},{"type":"Oscillator","params":{"frequency":700,"detune":0,"type":"sine"}},{"type":"Gain","params":{"gain":0.2}},{"type":"LFO","params":{"frequency":2500,"detune":0,"type":"sine"}},{"type":"GainCtrl","params":{"gain":0.2},"controlParam":"gain","controlParams":["gain"]},{"type":"Filter","params":{"frequency":1856.2509043867556,"Q":2.041175275711987,"detune":0,"gain":0,"type":"lowpass"}},{"type":"ADSR","params":{"attack":0,"decay":0,"sustain":1,"release":0.942968562844335,"depth":1},"controlParam":"gain","controlParams":["gain"]},{"type":"Gain","params":{"gain":1}}],"keyboard":{"portamento":0.216,"octave":4,"arpeggio":{"time":0.148,"mode":3,"octave":2}},"name":"Bells2"};

	var instrument = new Modulator.Instrument(ac, json, 4);
	var ct = -1;
	var score =
		'Y  WRTYTWO I ' +
		'Y  WRTYTWO I ' +
		'T  QERTRQO I ' +
		'T  QERTRQO P ';
	var notes = score.split('').map(function(k) {
		return k != ' ' ? 36 + KB_NOTES.indexOf(k) : 0;
	});
	var lastNote = 0;
	
	function tick() {
		if (lastNote) instrument.noteOff(lastNote);
		if (ct++ > 104) return;
		var note = notes[ct % notes.length];
		if (note > 0) instrument.noteOn(note);
		lastNote = note;
		setTimeout(tick, 200);
	}

	tick();
}