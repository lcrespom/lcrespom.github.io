import { neonSegment } from './draw.js'
import { playSound } from './audio.js'

export const FLOOR = 30
export const CEILING = 50
export let lives = 5

export function stepBoard(figures, height) {
  for (let f of figures) {
    let { miny, maxy } = f.getBounds()
    if (miny < CEILING || maxy > height - FLOOR) figureFail(f)
  }
}

export function drawBoard(ctx, score, tick) {
  let width = ctx.canvas.width
  let height = ctx.canvas.height
  let gloww = 5 + 2 * Math.sin(tick / 5)
  neonSegment(ctx, {
    x1: 0,
    y1: CEILING,
    x2: width,
    y2: CEILING,
    style: '#FFFFFF',
    glow: { width: gloww, blur: 5 }
  })
  neonSegment(ctx, {
    x1: 0,
    y1: height - FLOOR,
    x2: width,
    y2: height - FLOOR,
    style: '#FFFFFF',
    glow: { width: gloww, blur: 5 }
  })
  drawScore(ctx, score)
}

function figureFail(f) {
  if (f.dead) return
  lives--
  playSound('zap')
  f.dead = true
  f.style = '#0088FF'
  f.vx = 0
  if (f.vy < 0) f.vy = -f.vy / 2
  else f.vy = 0
}

function drawScore(ctx, score) {
  ctx.save()
  ctx.font = '24px NeonClubMusic'
  ctx.fillStyle = 'white'
  ctx.fillText('Score', 45, 25)
  ctx.fillText('Life', ctx.canvas.width - 35, 25)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#FF55AA'
  ctx.fillText(score.toLocaleString(), 110, 25)
  let x = ctx.canvas.width - 95
  ctx.fillStyle = '#66CCFF'
  for (let i = 0; i < lives; i++) {
    ctx.fillRect(x, 12, 15, 20)
    x -= 18
  }
  ctx.restore()
}
