(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
function listenAndOsc(canvas, cb) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();
    var navigator = window.navigator;
    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
    navigator.getUserMedia({ audio: true }, function (stream) {
        var ctx2d = get2dCtx(canvas);
        var oscData = new Uint8Array(analyser.fftSize);
        var source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        window.requestAnimationFrame(function (_) { return updateCanvas(ctx2d, canvas, analyser, oscData); });
        cb(stream);
    }, function (error) { return console.error(error); });
}
exports.listenAndOsc = listenAndOsc;
function stop(stream) {
    for (var _i = 0, _a = stream.getAudioTracks(); _i < _a.length; _i++) {
        var mst = _a[_i];
        mst.stop();
    }
}
exports.stop = stop;
function get2dCtx(canvas) {
    var gc = canvas.getContext('2d');
    if (!gc)
        throw Error('No CanvasRenderingContext2D found');
    return gc;
}
function updateCanvas(gc, canvas, analyser, data) {
    drawOsc(gc, canvas, analyser, data, '#FFFF00');
    window.requestAnimationFrame(function (_) { return updateCanvas(gc, canvas, analyser, data); });
}
function drawOsc(gc, canvas, analyser, data, color) {
    var _a = setupDraw(gc, canvas, data, color), w = _a[0], h = _a[1];
    analyser.getByteTimeDomainData(data);
    gc.moveTo(0, h / 2);
    var x = 0;
    while (data[x] > 128 && x < data.length / 4)
        x++;
    while (data[x] < 128 && x < data.length / 4)
        x++;
    var dx = (data.length * 0.75) / canvas.width;
    for (var i = 0; i < w; i++) {
        var y = data[Math.floor(x)];
        x += dx;
        gc.lineTo(i, h * y / 256);
    }
    gc.stroke();
    gc.closePath();
}
function setupDraw(gc, canvas, data, color) {
    var w = canvas.width;
    var h = canvas.height;
    gc.clearRect(0, 0, w, h);
    gc.beginPath();
    gc.strokeStyle = color;
    return [w, h];
}

},{}],2:[function(require,module,exports){
"use strict";
var listen = require('./listen');
function initS2T() {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    return recognition;
}
function traceEvent(txt, cb) {
    return function (event) {
        console.log(txt + ':', event);
        if (cb)
            cb();
    };
}
function registerS2TListeners(s2t) {
    s2t.onresult = function (event) {
        console.log('Result:', event);
        var txt = '';
        for (var i = 0; i < event.results.length; i++)
            txt += event.results[i][0].transcript;
        var result = $('#result');
        result.text(txt);
    };
    s2t.onnomatch = traceEvent('No match');
    s2t.onerror = traceEvent('Error');
    s2t.onstart = traceEvent('Start');
    s2t.onend = traceEvent('End');
    s2t.onaudiostart = traceEvent('Audio start', function (_) { return $('#b-listening').addClass('btn-info'); });
    s2t.onaudioend = traceEvent('Audio end', function (_) { return $('#b-listening').removeClass('btn-info'); });
    s2t.onsoundstart = traceEvent('Sound start', function (_) { return $('#b-sound').addClass('btn-info'); });
    s2t.onsoundend = traceEvent('Sound end', function (_) { return $('#b-sound').removeClass('btn-info'); });
    s2t.onspeechstart = traceEvent('Speech start', function (_) { return $('#b-speech').addClass('btn-info'); });
    s2t.onspeechend = traceEvent('Speech end', function (_) { return $('#b-speech').removeClass('btn-info'); });
}
function registerButtonListeners(s2t) {
    var stream;
    $('#s2t').click(function () {
        console.log('Listen start');
        s2t.lang = $('#langSel').val();
        s2t.start();
        listen.listenAndOsc($('#audio-osc')[0], function (strm) { return stream = strm; });
    });
    $('#s2tstop').click(function () {
        s2t.stop();
        listen.stop(stream);
    });
}
$(function () {
    var s2t = initS2T();
    registerS2TListeners(s2t);
    registerButtonListeners(s2t);
});

},{"./listen":1}]},{},[2])
//# sourceMappingURL=bundle.js.map
