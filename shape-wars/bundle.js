(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
const game_1 = require('./gamelib/game');
const explosion_1 = require('./explosion');
const wave_1 = require('./wave');
const waves_1 = require('./static/waves');
/** The living set of enemy ships in the game */
class Enemies extends game_1.ElementGroup {
    constructor(wave) {
        super();
        this.wave = wave;
        this.endWave = false;
        this.wavect = 100;
        let squadrons = waves_1.initWave(wave);
        for (let sq of squadrons)
            this.add(new wave_1.Squadron(sq.route, sq.shape, sq.ships, sq.steps, sq.delay));
    }
    step(game) {
        super.step(game);
        this.endWave = this.items.length == 0;
        if (this.wavect > 0)
            this.wavect--;
    }
}
exports.Enemies = Enemies;
class Enemy {
    constructor(route, shape) {
        this.route = route;
        this.shape = shape;
        this.dead = false;
    }
    step(game) {
        let elements = game.elements;
        if (elements.ship.dead)
            this.route.ay = -0.2;
        this.move(game.canvas);
    }
    draw(game) {
        this.shape.draw(game.gc, this.route.x, this.route.y, this.calcAngle());
    }
    calcAngle() {
        let angle = -Math.atan(this.route.speedX / this.route.speedY);
        if (this.route.speedY < 0)
            angle += Math.PI;
        return angle;
    }
    move(canvas) {
        this.route.move();
        if (this.shape.isOutside(canvas, this.route.x, this.route.y)) {
            this.dead = true;
            return;
        }
    }
    isHit(x, y) {
        return this.shape.isPointInside(this.route.x, this.route.y, x, y);
    }
    explode(game) {
        let elements = game.elements;
        elements.explosions.add(new explosion_1.Explosion({ x: this.route.x, y: this.route.y }));
        elements.sounds.enemyExplode();
        this.dead = true;
    }
}
exports.Enemy = Enemy;

},{"./explosion":2,"./gamelib/game":3,"./static/waves":12,"./wave":14}],2:[function(require,module,exports){
"use strict";
let defaultParams = {
    x: 0, y: 0, radius: 30,
    growTicks: 12, shrinkTicks: 40,
    fillStyle: '', strokeStyle: 'white',
    rays: 6
};
class Explosion {
    constructor(params) {
        this.stepct = 0;
        this.dead = false;
        this.radius = 0;
        this.params = Object.assign({}, defaultParams, params);
    }
    step(game) {
        let grow = this.params.growTicks;
        let shrink = this.params.shrinkTicks;
        let r = this.params.radius;
        if (this.stepct < grow)
            this.radius += r / grow;
        else if (this.stepct < grow + shrink)
            this.radius -= r / shrink;
        else
            this.dead = true;
        this.stepct++;
    }
    draw(game) {
        game.gc.strokeStyle = this.params.strokeStyle || 'red';
        game.gc.translate(this.params.x, this.params.y);
        let angle = 2 * Math.PI / this.params.rays;
        game.gc.rotate(Math.random());
        game.gc.beginPath();
        for (let i = 0; i < this.params.rays; i++) {
            game.gc.moveTo(0, 0);
            game.gc.lineTo(this.radius * (0.5 + Math.random() / 2), 0);
            game.gc.rotate(angle);
        }
        game.gc.stroke();
        game.gc.setTransform(1, 0, 0, 1, 0, 0);
    }
}
exports.Explosion = Explosion;

},{}],3:[function(require,module,exports){
"use strict";
class Game {
    constructor(canvas, elements) {
        this.canvas = canvas;
        this.elements = elements;
        this.fps = 0;
        this.cpu = 0;
        let ctx = this.canvas.getContext('2d');
        if (!ctx)
            throw Error('Could not setup canvas');
        this.gc = ctx;
        this.time = Date.now();
    }
    loop(cb) {
        window.requestAnimationFrame(_ => {
            let tBefore = Date.now();
            this.step();
            this.draw();
            this.calcTime(tBefore);
            if (cb)
                cb();
            this.loop(cb);
        });
    }
    step() {
        for (let key of Object.keys(this.elements))
            this.elements[key].step(this);
    }
    draw() {
        this.gc.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let key of Object.keys(this.elements))
            this.elements[key].draw(this);
    }
    calcTime(tBefore) {
        let now = Date.now();
        let elapsed = now - this.time;
        this.time = now;
        this.fps = 1000 / elapsed;
        this.cpu = (now - tBefore) / elapsed;
    }
}
exports.Game = Game;
class ElementGroup {
    constructor() {
        this.items = [];
    }
    step(game) {
        for (let item of this.items)
            item.step(game);
    }
    draw(game) {
        this.items = this.items.filter(item => !item.dead);
        for (let item of this.items)
            item.draw(game);
    }
    add(element) {
        this.items.push(element);
    }
    forEach(cb) {
        this.items.forEach(item => {
            if (item instanceof ElementGroup)
                item.forEach(cb);
            else
                cb(item);
        });
    }
    find(cb) {
        let ge = undefined;
        this.items.some(item => {
            if (item instanceof ElementGroup) {
                ge = item.find(cb);
                return ge !== undefined;
            }
            else {
                if (!cb(item))
                    return false;
                ge = item;
                return true;
            }
        });
        return ge;
    }
}
exports.ElementGroup = ElementGroup;

},{}],4:[function(require,module,exports){
"use strict";
const pressedKeys = {};
function setupKeyboard(kbTarget = 'body') {
    $(kbTarget)
        .on('keydown', evt => {
        // Skip repetitions
        if (pressedKeys[evt.keyCode])
            return;
        // Skip browser shortcuts
        if (evt.metaKey || evt.altKey || evt.ctrlKey)
            return;
        pressedKeys[evt.keyCode] = true;
    })
        .on('keyup', evt => {
        pressedKeys[evt.keyCode] = false;
    });
}
exports.setupKeyboard = setupKeyboard;
function isKeyPressed(keyCode) {
    return pressedKeys[keyCode];
}
exports.isKeyPressed = isKeyPressed;

},{}],5:[function(require,module,exports){
"use strict";
class Shape {
    constructor(paths) {
        this.paths = paths;
        let { minx, miny } = this.calcWidthHeight(paths);
        this.recenter(minx, miny);
        this.radius = Math.max(this.width, this.height) / 2;
    }
    calcWidthHeight(paths) {
        let { x: minx, y: miny } = paths[0].points.reduce((prev, curr) => ({
            x: Math.min(prev.x, curr.x),
            y: Math.min(prev.y, curr.y)
        }));
        let { x: maxx, y: maxy } = paths[0].points.reduce((prev, curr) => ({
            x: Math.max(prev.x, curr.x),
            y: Math.max(prev.y, curr.y)
        }));
        this.width = maxx - minx;
        this.height = maxy - miny;
        return { minx, miny };
    }
    recenter(minx, miny) {
        this.paths.forEach(path => path.points.forEach(point => {
            point.x -= minx + this.width / 2;
            point.y -= miny + this.height / 2;
        }));
    }
    draw(gc, x, y, angle = 0, scaleX = 1, scaleY = scaleX) {
        for (let path of this.paths) {
            gc.beginPath();
            gc.fillStyle = path.fillStyle;
            gc.translate(x, y);
            if (angle)
                gc.rotate(angle);
            if (scaleX != 1 || scaleY != 1)
                gc.scale(scaleX, scaleY);
            gc.moveTo(path.points[0].x, path.points[0].y);
            for (let i = 1; i < path.points.length; i++)
                gc.lineTo(path.points[i].x, path.points[i].y);
            gc.closePath();
            gc.fill();
            gc.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
    isOutside(canvas, x, y) {
        return x + this.width < 0
            || x - this.width > canvas.width
            || y + this.height < 0
            || y - this.height > canvas.height;
    }
    isPointInside(sx, sy, px, py) {
        let sqr = x => x * x;
        let dist = Math.sqrt(sqr(sx - px) + sqr(sy - py));
        return dist <= this.radius;
    }
}
exports.Shape = Shape;

},{}],6:[function(require,module,exports){
"use strict";
const keyboard_1 = require('./gamelib/keyboard');
const shape_wars_1 = require('./shape-wars');
const RESET_KEY = 82;
function initGame() {
    keyboard_1.setupKeyboard();
    let canvas = $('#game-canvas')[0];
    let shapeWars = new shape_wars_1.ShapeWars(canvas);
    return shapeWars;
}
function runGame() {
    let fpsct = 0;
    let shapeWars = initGame();
    shapeWars.loop(() => {
        if ((++fpsct) == 30) {
            fpsct = 0;
            $('#fps').text(Math.round(shapeWars.game.fps));
            $('#cpu').text(Math.round(shapeWars.game.cpu * 100));
        }
        if (keyboard_1.isKeyPressed(RESET_KEY))
            shapeWars.reset();
    });
}
$(function () {
    runGame();
});

},{"./gamelib/keyboard":4,"./shape-wars":7}],7:[function(require,module,exports){
"use strict";
const game_1 = require('./gamelib/game');
const stars_1 = require('./stars');
const status_display_1 = require('./status-display');
const ship_1 = require('./ship');
const enemies_1 = require('./enemies');
const sounds_1 = require('./sounds');
class ShapeWars {
    constructor(canvas) {
        this.playedGameOver = false;
        this.wave = 1;
        this.sounds = new sounds_1.Sounds();
        this.createElements(canvas);
        this.game = new game_1.Game(canvas, this.elements);
    }
    loop(cb) {
        this.game.loop(() => {
            this.step();
            if (cb)
                cb();
        });
    }
    step() {
        if (this.playedGameOver)
            return;
        let ship = this.elements.ship;
        if (ship.startWave) {
            ship.startWave = false;
            this.startWave();
        }
        else if (ship.gameOver) {
            this.sounds.gameOver();
            this.playedGameOver = true;
        }
        else if (this.elements.enemies.endWave) {
            this.wave++;
            this.startWave();
        }
    }
    startWave() {
        this.sounds.waveStart();
        this.elements.enemies = new enemies_1.Enemies(this.wave);
    }
    reset() {
        this.wave = 1;
        this.createElements(this.game.canvas);
        this.game.elements = this.elements;
        this.playedGameOver = false;
    }
    createElements(canvas) {
        this.elements = {
            stars: new stars_1.Starfield(canvas),
            status: new status_display_1.StatusDisplay(),
            ship: new ship_1.Ship(canvas),
            bullets: new game_1.ElementGroup(),
            enemies: new enemies_1.Enemies(this.wave),
            explosions: new game_1.ElementGroup(),
            sounds: this.sounds
        };
    }
}
exports.ShapeWars = ShapeWars;

},{"./enemies":1,"./gamelib/game":3,"./ship":8,"./sounds":9,"./stars":10,"./status-display":13}],8:[function(require,module,exports){
"use strict";
const shape_1 = require('./gamelib/shape');
const keyboard_1 = require('./gamelib/keyboard');
const explosion_1 = require('./explosion');
const KEY_LEFT = 90;
const KEY_RIGHT = 88;
const CURSOR_LEFT = 37;
const CURSOR_RIGHT = 39;
const KEY_FIRE = 77;
const BULLET_LENGTH = 6;
const BULLET_STROKE_STYLE = 'white';
const BULLET_SPEED = 8;
const DYING_TICKS = 180;
const ENEMY_SCORE = 100;
let shipPaths = [{
        fillStyle: 'rgb(0, 192, 128)',
        points: [
            { x: 0, y: 50 },
            { x: 25, y: 0 },
            { x: 50, y: 50 }
        ]
    }];
class Ship {
    constructor(canvas) {
        this.speedY = 1;
        this.speedX = 3;
        this.canFire = true;
        this.dead = false;
        this.lives = 3;
        this.gameOver = false;
        this.startWave = true;
        this.score = 0;
        this.x = canvas.width / 2;
        this.y = canvas.height - 100;
        this.shape = new shape_1.Shape(shipPaths);
    }
    step(game) {
        if (this.dead) {
            this.diect--;
            if (this.diect <= 0) {
                if (this.lives <= 0)
                    this.gameOver = true;
                else {
                    this.dead = false;
                    this.startWave = true;
                }
            }
        }
        else {
            this.move(game);
            this.fire(game);
            if (this.hitByEnemy(game))
                this.die(game);
        }
    }
    draw(game) {
        if (this.dead)
            return;
        this.shape.draw(game.gc, this.x, this.y);
    }
    move(game) {
        if ((keyboard_1.isKeyPressed(KEY_LEFT) || keyboard_1.isKeyPressed(CURSOR_LEFT))
            && this.x > this.shape.width / 2 + 5)
            this.x -= this.speedX;
        if ((keyboard_1.isKeyPressed(KEY_RIGHT) || keyboard_1.isKeyPressed(CURSOR_RIGHT))
            && this.x < game.canvas.width - this.shape.width / 2 - 5)
            this.x += this.speedX;
    }
    fire(game) {
        if (keyboard_1.isKeyPressed(KEY_FIRE)) {
            if (!this.canFire)
                return;
            this.canFire = false;
            let elements = game.elements;
            elements.bullets.add(new Bullet(this.x, this.y - 15));
            elements.sounds.pew();
        }
        else {
            this.canFire = true;
        }
    }
    hitByEnemy(game) {
        let killed = false;
        let elements = game.elements;
        elements.enemies.find((enemy) => {
            if (!near(this.x, this.y, this.shape.radius, enemy.route.x, enemy.route.y, enemy.shape.radius))
                return false;
            for (let point of this.shape.paths[0].points) {
                if (enemy.isHit(this.x + point.x, this.y + point.y)) {
                    killed = true;
                    return true;
                }
            }
            return false;
        });
        return killed;
    }
    die(game) {
        let elements = game.elements;
        elements.explosions.add(new explosion_1.Explosion({
            x: this.x, y: this.y, radius: 50
        }));
        elements.sounds.shipExplode();
        this.diect = DYING_TICKS;
        this.dead = true;
        this.lives--;
    }
}
exports.Ship = Ship;
function near(x1, y1, r1, x2, y2, r2) {
    let sqr = x => x * x;
    let dist = Math.sqrt(sqr(x1 - x2) + sqr(y1 - y2));
    return dist <= r1 + r2;
}
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dead = false;
    }
    step(game) {
        this.y -= BULLET_SPEED;
        if (this.hitEnemy(game) || this.y < 0)
            this.dead = true;
    }
    draw(game) {
        game.gc.beginPath();
        game.gc.strokeStyle = BULLET_STROKE_STYLE;
        game.gc.moveTo(this.x, this.y);
        game.gc.lineTo(this.x, this.y - BULLET_LENGTH);
        game.gc.closePath();
        game.gc.stroke();
    }
    hitEnemy(game) {
        let killed = false;
        let elements = game.elements;
        elements.enemies.find((enemy) => {
            if (enemy.isHit(this.x, this.y)) {
                enemy.explode(game);
                elements.ship.score += ENEMY_SCORE;
                killed = true;
                return true;
            }
            return false;
        });
        return killed;
    }
}

},{"./explosion":2,"./gamelib/keyboard":4,"./gamelib/shape":5}],9:[function(require,module,exports){
"use strict";
const game_1 = require('./gamelib/game');
const sounds_1 = require('./static/sounds');
class Sounds extends game_1.ElementGroup {
    constructor() {
        super();
        let ac = this.createAudioContext();
        let MInstrument = window.Modulator.Instrument;
        this.iPew = new MInstrument(ac, sounds_1.default.pew, 4);
        this.iEnemyExplode = new MInstrument(ac, sounds_1.default.enemyExplode, 4);
        this.iShipExplode = new MInstrument(ac, sounds_1.default.shipExplode, 1);
        this.iGameStart = new MInstrument(ac, sounds_1.default.gameStart, 3);
        this.iGameOver = new MInstrument(ac, sounds_1.default.gameOver, 3);
    }
    createAudioContext() {
        const CtxClass = window.AudioContext || window.webkitAudioContext;
        return new CtxClass();
    }
    soundNote(instrument, note = 57) {
        instrument.noteOff(57);
        instrument.noteOn(57);
    }
    pew() {
        this.soundNote(this.iPew);
    }
    enemyExplode() {
        this.soundNote(this.iEnemyExplode);
    }
    shipExplode() {
        this.soundNote(this.iShipExplode);
    }
    waveStart() {
        this.add(new NoteSequence(this.iGameOver, [
            { steps: 20, on: 48 },
            { steps: 20, on: 55 },
            { steps: 20, on: 60 },
            { steps: 0, off: 48 },
            { steps: 0, off: 55 },
            { steps: 0, off: 60 }
        ]));
    }
    gameOver() {
        this.add(new NoteSequence(this.iGameOver, [
            { steps: 30, on: 47 },
            { steps: 30, off: 47 },
            { steps: 30, on: 41 },
            { steps: 30, off: 41 },
            { steps: 30, on: 36 },
            { steps: 0, off: 36 }
        ]));
    }
}
exports.Sounds = Sounds;
class NoteSequence {
    constructor(instrument, notes) {
        this.instrument = instrument;
        this.notes = notes;
        this.idx = -0;
        this.stepct = 0;
        this.dead = false;
    }
    draw(game) { }
    step(game) {
        this.stepct--;
        if (this.stepct > 0)
            return;
        let note = this.notes[this.idx];
        if (note.off)
            this.instrument.noteOff(note.off);
        if (note.on)
            this.instrument.noteOn(note.on);
        this.stepct = note.steps;
        // ToDo: if stepct == 0, immediately play next note
        // ToDo: investigante incorrect notes
        this.idx++;
        if (this.idx >= this.notes.length)
            this.dead = true;
    }
}

},{"./gamelib/game":3,"./static/sounds":11}],10:[function(require,module,exports){
"use strict";
const NUM_STARS = 200;
class Starfield {
    constructor(canvas) {
        this.initStars(canvas.width, canvas.height);
    }
    initStars(w, h) {
        this.stars = [];
        for (let i = 0; i < NUM_STARS; i++) {
            this.stars.push(this.initStar(w, h));
        }
    }
    initStar(w, h, str = { y: 0 }) {
        let star = str;
        star.x = Math.random() * w;
        star.y = star.y > 0 ? 0 : Math.random() * h;
        star.speed = 0.1 + Math.random() * 0.9;
        let randomColor = () => Math.round(128 + 127 * Math.random() * star.speed);
        let r = randomColor(), g = randomColor(), b = randomColor();
        star.fillStyle = `rgb(${r}, ${g}, ${b})`;
        return star;
    }
    drawStar(gc, star) {
        gc.fillStyle = star.fillStyle;
        gc.fillRect(star.x, star.y, 2, 2);
    }
    step(game) {
        for (let star of this.stars) {
            let elements = game.elements;
            star.y += star.speed * elements.ship.speedY;
            if (star.y > game.canvas.height)
                this.initStar(game.canvas.width, game.canvas.height, star);
        }
    }
    draw(game) {
        for (let star of this.stars) {
            this.drawStar(game.gc, star);
        }
    }
}
exports.Starfield = Starfield;

},{}],11:[function(require,module,exports){
"use strict";
const pew = {
    nodes: [
        { id: 0, x: 460, y: 120, name: 'Out', inputs: [5], classes: 'node node-out' },
        { id: 1, x: 121, y: 122, name: 'Osc', inputs: [2], classes: 'node node-src' },
        { id: 2, x: 116, y: 311, name: 'ADSR', inputs: [], classes: 'node node-ctrl' },
        { id: 4, x: 295, y: 322, name: 'ADSR', inputs: [], classes: 'node node-ctrl' },
        { id: 5, x: 298, y: 122, name: 'Gain', inputs: [4, 1], classes: 'node node-effect' }
    ],
    nodeData: [
        { type: 'out', params: {} },
        { type: 'Oscillator', params: { frequency: 1200, detune: 0, type: 'square' } },
        { type: 'ADSR',
            params: { attack: 0, decay: 0.2, sustain: 0, release: 0, depth: 1 },
            controlParam: 'frequency', controlParams: ['frequency', 'detune']
        },
        { type: 'ADSR',
            params: { attack: 0, decay: 0, sustain: 1, release: 0.05, depth: 1 },
            controlParam: 'gain', controlParams: ['gain'] },
        { type: 'Gain', params: { gain: 1 } }
    ],
    name: 'Pew!',
    modulatorType: 'synth',
    keyboard: {
        portamento: 0, octave: 4, arpeggio: { bpm: 60, mode: 0, octave: 1 }
    }
};
const enemyExplode = {
    nodes: [
        { id: 0, x: 500, y: 120, name: 'Out', inputs: [2], classes: 'node node-out' },
        { id: 1, x: 100, y: 120, name: 'Noise', inputs: [], classes: 'node node-src' },
        { id: 2, x: 300, y: 120, name: 'Filter', inputs: [1, 5], classes: 'node node-effect' },
        { id: 5, x: 302, y: 260, name: 'ADSR', inputs: [], classes: 'node node-ctrl' }
    ],
    nodeData: [
        { type: 'out', params: {} },
        { type: 'Noise', params: { gain: 0.5 } },
        { type: 'Filter', params: { frequency: 2916, Q: 20.82, detune: 0, gain: 0, type: 'lowpass' } },
        { type: 'ADSR', params: { attack: 0, decay: 0.3723466750715221, sustain: 0, release: 0, depth: 1 },
            controlParam: 'frequency', controlParams: ['frequency', 'Q', 'detune', 'gain']
        }
    ],
    name: 'enemy-explode',
    modulatorType: 'synth',
    keyboard: { portamento: 0, octave: 3, arpeggio: { bpm: 60, mode: 0, octave: 1 } }
};
const shipExplode = {
    nodes: [
        { id: 0, x: 501, y: 119, name: 'Out', inputs: [2], classes: 'node node-out' },
        { id: 1, x: 92, y: 118, name: 'Noise', inputs: [], classes: 'node node-src' },
        { id: 2, x: 311, y: 114, name: 'Gain', inputs: [3, 4], classes: 'node node-effect' },
        { id: 3, x: 312, y: 267, name: 'ADSR', inputs: [], classes: 'node node-ctrl' },
        { id: 4, x: 176, y: 216, name: 'Filter', inputs: [1], classes: 'node node-effect' }
    ],
    nodeData: [
        { type: 'out', params: {} },
        { type: 'Noise', params: { gain: 1 } },
        { type: 'Gain', params: { gain: 10 } },
        { type: 'ADSR', params: { attack: 0, decay: 2, sustain: 0, release: 0, depth: 1 }, controlParam: 'gain', controlParams: ['gain'] },
        { type: 'Filter', params: { frequency: 322, Q: 3.259, detune: 0, gain: 0, type: 'lowpass' } }
    ],
    name: 'ship-explode',
    modulatorType: 'synth',
    keyboard: {
        portamento: 0, octave: 3, arpeggio: { bpm: 60, mode: 0, octave: 1 }
    }
};
const gameStart = {
    nodes: [
        { id: 0, x: 600, y: 200, name: 'Out', inputs: [4], classes: 'node node-out' },
        { id: 1, x: 300, y: 200, name: 'Filter', inputs: [2, 3, 5, 7], classes: 'node node-effect' },
        { id: 2, x: 140, y: 160, name: 'Osc', inputs: [], classes: 'node node-src' },
        { id: 3, x: 140, y: 260, name: 'Osc', inputs: [], classes: 'node node-src' },
        { id: 4, x: 460, y: 200, name: 'Gain', inputs: [1], classes: 'node node-effect' },
        { id: 5, x: 300, y: 300, name: 'ADSR', inputs: [], classes: 'node node-ctrl' },
        { id: 6, x: 460, y: 60, name: 'Delay', inputs: [4], classes: 'node node-effect' },
        { id: 7, x: 300, y: 60, name: 'Pan', inputs: [6, 9], classes: 'node node-effect' },
        { id: 9, x: 140, y: 60, name: 'LFO', inputs: [], classes: 'node node-ctrl' }
    ],
    nodeData: [
        { type: 'out', params: {} },
        { type: 'Filter', params: { frequency: 3500, Q: 7.5, detune: 0, gain: 0, type: 'lowpass' } },
        { type: 'Oscillator', params: { frequency: 140, detune: 0, type: 'sawtooth' } },
        { type: 'Oscillator', params: { frequency: 140, detune: 10, type: 'sawtooth' } },
        { type: 'Gain', params: { gain: 0.32 } },
        { type: 'ADSR', params: { attack: 0, decay: 0.5, sustain: 1, release: 2, depth: 0.999 },
            controlParam: 'frequency', controlParams: ['frequency', 'Q', 'detune', 'gain'] },
        { type: 'Delay', params: { delayTime: 0.05 } },
        { type: 'StereoPan', params: { pan: 0 } },
        { type: 'LFO', params: { frequency: 0.44422, detune: 0, type: 'sine' }, controlParam: 'pan', controlParams: ['pan'] }
    ],
    name: 'Space',
    modulatorType: 'synth',
    keyboard: { portamento: 0, octave: 3, arpeggio: { bpm: 60, mode: 0, octave: 1 } }
};
const gameOver = {
    nodes: [
        { id: 0, x: 520, y: 160, name: 'Out', inputs: [4], classes: 'node node-out' },
        { id: 1, x: 320, y: 160, name: 'Filter', inputs: [2, 3, 5], classes: 'node node-effect' },
        { id: 2, x: 140, y: 100, name: 'Osc', inputs: [], classes: 'node node-src' },
        { id: 3, x: 140, y: 220, name: 'Osc', inputs: [], classes: 'node node-src' },
        { id: 4, x: 420, y: 60, name: 'Gain', inputs: [1], classes: 'node node-effect' },
        { id: 5, x: 320, y: 300, name: 'ADSR', inputs: [], classes: 'node node-ctrl' }
    ],
    nodeData: [
        { type: 'out', params: {} },
        { type: 'Filter', params: { frequency: 3804.4, Q: 9.284, detune: 0, gain: 0, type: 'lowpass' } },
        { type: 'Oscillator', params: { frequency: 140, detune: 0, type: 'sawtooth' } },
        { type: 'Oscillator', params: { frequency: 140, detune: 10, type: 'sawtooth' } },
        { type: 'Gain', params: { gain: 0.68 } },
        { type: 'ADSR', params: { attack: 0.4022, decay: 0.5, sustain: 1, release: 1, depth: 0.99 },
            controlParam: 'frequency', controlParams: ['frequency', 'Q', 'detune', 'gain'] }
    ],
    name: 'Tesla',
    modulatorType: 'synth',
    keyboard: { portamento: 0, octave: 3, arpeggio: { bpm: 60, mode: 0, octave: 1 } }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    pew, enemyExplode, shipExplode, gameStart, gameOver
};

},{}],12:[function(require,module,exports){
"use strict";
const shape_1 = require('../gamelib/shape');
const wave_1 = require('../wave');
// -------------------- Enemy shapes and colors --------------------
let fillStyles = [
    '#FF0040', '#FF0080', '#FF00FF', '#4080FF'
];
let enemyPoints = [
    { x: 0, y: 0 },
    { x: 30, y: 0 },
    { x: 20, y: 30 },
    { x: 10, y: 30 }
];
function initShapes() {
    let shapes = [];
    for (let fillStyle of fillStyles) {
        shapes.push(new shape_1.Shape([{
                fillStyle,
                points: enemyPoints
            }]));
    }
    return shapes;
}
let enemyShapes = initShapes();
// -------------------- Enemy routes --------------------
let routeC = new wave_1.Route(460, -20, -2, 1, [
    { steps: 36, ax: -0.2, ay: 0.1 },
    { steps: 100, ax: 0.2, ay: 0 }
]);
let routeD = new wave_1.Route(20, -20, 2, 1, [
    { steps: 36, ax: 0.2, ay: 0.1 },
    { steps: 100, ax: -0.2, ay: 0 }
]);
let routeU = new wave_1.Route(20, -20, 2, 10, [
    { steps: 1000, ax: 0, ay: -0.12 }
]);
let routeV = new wave_1.Route(460, -20, -2, 10, [
    { steps: 1000, ax: 0, ay: -0.11 }
]);
let routeИ = new wave_1.Route(20, -20, 2, 11, [
    { steps: 110, ax: 0, ay: -0.14 },
    { steps: 500, ax: 0, ay: 0.14 },
]);
let routeN = new wave_1.Route(460, -20, -2, 11, [
    { steps: 110, ax: 0, ay: -0.14 },
    { steps: 500, ax: 0, ay: 0.14 },
]);
let routeO = new wave_1.Route(20, -20, 5.5, 11, [
    { steps: 130, ax: -0.04, ay: -0.13 },
    { steps: 500, ax: -0.06, ay: 0.16 },
]);
let routeQ = new wave_1.Route(460, -20, -5.5, 11, [
    { steps: 130, ax: 0.04, ay: -0.13 },
    { steps: 500, ax: 0.06, ay: 0.16 },
]);
let enemyRoutes = [
    routeO, routeQ, routeN, routeИ, routeU, routeV, routeC, routeD
];
function shuffle(aIn) {
    let a = [...aIn]; // Copy array to make function pure
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}
function initWave(w) {
    let squadrons = [];
    let shapes = shuffle(enemyShapes);
    let routes = shuffle(enemyRoutes);
    let i = 0;
    for (let route of routes) {
        squadrons.push({
            route,
            shape: shapes[i % shapes.length],
            ships: 3 + w,
            steps: 20,
            delay: 100 + i * 130
        });
        i++;
    }
    return squadrons;
}
exports.initWave = initWave;

},{"../gamelib/shape":5,"../wave":14}],13:[function(require,module,exports){
"use strict";
const game_1 = require('./gamelib/game');
/*
Cool fonts:
    https://fonts.google.com/selection?
        category=Display,Monospace&
        selection.family=Electrolize|Geostar+Fill|Kelly+Slab|Press+Start+2P|Revalia|VT323
*/
class StatusDisplay extends game_1.ElementGroup {
    constructor() {
        super();
        this.add(new ShipsDisplay());
        this.add(new Scoring());
        this.add(new Messages());
    }
}
exports.StatusDisplay = StatusDisplay;
class ShipsDisplay {
    step(game) { }
    draw(game) {
        let ship = game.elements.ship;
        for (let i = 0; i < ship.lives; i++) {
            ship.shape.draw(game.gc, 30 + i * 30, 30, 0, 0.5);
        }
    }
}
class Scoring {
    step(game) { }
    draw(game) {
        let score = game.elements.ship.score;
        let txt = '' + score;
        prepareFont(game.gc, 28);
        let w = game.gc.measureText(txt).width;
        game.gc.fillText(txt, game.gc.canvas.width - w - 20, 40);
    }
}
class Messages {
    step(game) { }
    draw(game) {
        let elements = game.elements;
        let gameOver = elements.ship.gameOver;
        if (gameOver)
            this.centerText(game.gc, 'GAME OVER', 50);
        else if (elements.enemies.wavect)
            this.centerText(game.gc, 'WAVE  ' + elements.enemies.wave, 30);
    }
    centerText(gc, txt, size) {
        prepareFont(gc, size);
        let w = gc.measureText(txt).width;
        let x = gc.canvas.width / 2 - w / 2;
        let y = gc.canvas.height / 2;
        gc.fillText(txt, x, y);
    }
}
function prepareFont(gc, size) {
    gc.font = `${size}px 'Geostar Fill'`;
    gc.fillStyle = 'white';
}

},{"./gamelib/game":3}],14:[function(require,module,exports){
"use strict";
const game_1 = require('./gamelib/game');
const enemies_1 = require('./enemies');
/** A route is in charge of moving a ship across the canvas, folliwing a
 * given path based on accelleration rules
 */
class Route {
    constructor(x, y, speedX, speedY, parts) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.parts = parts;
        this.step = 0;
        this.part = 0;
        this.ax = 0;
        this.ay = 0;
    }
    clone() {
        return new Route(this.x, this.y, this.speedX, this.speedY, this.parts);
    }
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.part >= this.parts.length)
            return;
        let segment = this.parts[this.part];
        this.speedX += this.ax ? this.ax : segment.ax;
        this.speedY += this.ay ? this.ay : segment.ay;
        this.step++;
        if (this.step > segment.steps) {
            this.step = 0;
            this.part++;
        }
    }
}
exports.Route = Route;
/** A squadron is a group of ships that follow the same route, spaced
 * between each other by a given amount of steps.
 */
class Squadron extends game_1.ElementGroup {
    constructor(route, shape, ships, steps, delay = 0) {
        super();
        this.route = route;
        this.shape = shape;
        this.ships = ships;
        this.steps = steps;
        this.dead = false;
        this.stepct = steps - delay;
    }
    step(game) {
        super.step(game);
        if (this.ships <= 0) {
            this.dead = this.items.every(e => !!e.dead);
            return;
        }
        this.stepct++;
        if (this.stepct >= this.steps) {
            this.stepct = 0;
            this.ships--;
            this.add(new enemies_1.Enemy(this.route.clone(), this.shape));
        }
    }
}
exports.Squadron = Squadron;

},{"./enemies":1,"./gamelib/game":3}]},{},[6])
//# sourceMappingURL=bundle.js.map
