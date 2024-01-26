import { neonPoly } from './draw.js'

const GRAVITY = 0.1

export class Figure {
  constructor({ cx, cy, vx = 0, vy = 0, r, angle = 0, vangle = 0, segments, style, label }) {
    this.cx = cx
    this.cy = cy
    this.r = r
    this.angle = angle
    this.segments = segments
    this.style = style
    this.label = label
    this.vx = vx
    this.vy = vy
    this.vangle = vangle
    this.glow = { width: 6, blur: 5 }
    this.points = []
  }

  step(speed) {
    this.vy += GRAVITY * speed
    this.cx += this.vx * speed
    this.cy += this.vy * speed
    this.angle += this.vangle * speed
  }

  draw(ctx) {
    // Draw Polygon
    this.points = neonPoly(ctx, this)
    // draw label
    ctx.fillStyle = 'white'
    ctx.fillText(this.label, this.cx, this.cy)
  }

  getBounds() {
    let minx = Number.MAX_SAFE_INTEGER
    let maxx = Number.MIN_SAFE_INTEGER
    let miny = minx
    let maxy = maxx
    for (let p of this.points) {
      if (p.x < minx) minx = p.x
      else if (p.x > maxx) maxx = p.x
      if (p.y < miny) miny = p.y
      else if (p.y > maxy) maxy = p.y
    }
    return { minx, miny, maxx, maxy }
  }
}
