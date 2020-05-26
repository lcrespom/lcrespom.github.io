import { Figure } from './figure.js'
import { stepBoard, drawBoard, lives } from './board.js'
import { playSound } from './audio.js'

const RADIUS = 40
const MAX_DROP_PERIOD = 240

let canvas = document.getElementById('canvas')
let height = canvas.height, width = canvas.width
let ctx = canvas.getContext('2d')
let figures = []
let tick = 0
let dropPeriod = MAX_DROP_PERIOD
let score = 0


function getFigureStyle(segments) {
    switch(segments) {
        case 3: return '#00FF00'
        case 4: return '#FF0060'
        case 5: return '#00FFFF'
        case 6: return '#FFFF00'
        default: throw new Error('Unexpected number of segments')
    }
}

function randomFigure() {
    playSound('pop')
    let left = Math.random() < 0.5
    let cx = left ? 0 : width
    let cy = 270 + Math.random() * (height - 500)
    let vx = 1 + Math.random() * 2
    if (!left) vx = -vx
    let vy = - 2 - Math.random() * 4
    let vangle = 0.04 - Math.random() * 0.08
    let segments = 3 + Math.floor(Math.random() * 4)
    let label = String.fromCharCode(65 + 26 * Math.random())
    return new Figure({
        cx, cy, vx, vy, vangle,
        r: RADIUS, segments, style: getFigureStyle(segments), label
    })
}


function handleKeyDown(evt) {
    let key = evt.key.toUpperCase()
    let lowestF = { cy: 0 }
    for (let f of figures) {
        if (!f.dead && f.label == key && lowestF.cy < f.cy)
            lowestF = f
    }
    if (lowestF.r) {
        lowestF.vy = -6
        score += 50
        playSound('boing')
    }
}

function startGame() {
    ctx.font = '24px SingleLine'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    document.body.addEventListener('keydown', handleKeyDown)
}

function gameOver() {
    ctx.font = '50px NeonClubMusic'
    ctx.fillText('GAME OVER', width / 2, height / 2)
    playSound('gameover')
    document.body.addEventListener('click', _ => location.reload())
}

function stepGame() {
    if (tick % Math.floor(dropPeriod) == 0)
        figures.push(randomFigure())
    if (dropPeriod > 15) dropPeriod -= 0.01
    tick++
    stepBoard(figures, height)
    for (let f of figures) {
        f.step()
    }
    for (let f of figures)
        if (f.cx - RADIUS >= width || f.cx + RADIUS <= 0)
            score += 100
    figures = figures.filter(f =>
        f.cy - RADIUS < height &&
        f.cx - RADIUS < width  && f.cx + RADIUS > 0)
}

function drawGame() {
    for (let f of figures)
        f.draw(ctx)
    drawBoard(ctx, score, tick)
}

function animateFrame() {
    stepGame()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGame()
    if (lives <= 0)
        gameOver()
    else
        requestAnimationFrame(animateFrame)
}


function main() {
    startGame()
    animateFrame()
}

main()
