const LINE_WIDTH = 2


/**
 * 
 * @param {CanvasRenderingContext2D} ctx
 * @param {any} style
 * @param {object} glow
 * @param {Function} drawFunction
 */
export function neonFigure(ctx, style, glow, drawFunction) {
    ctx.strokeStyle = style
    ctx.lineWidth = glow.width
    ctx.filter = `blur(${glow.blur}px)`
    drawFunction()
    ctx.lineWidth = LINE_WIDTH
    ctx.filter = 'none'
    return drawFunction()
}

export function neonPoly(ctx, { cx, cy, r, segments, angle, style, glow }) {
    return neonFigure(ctx, style, glow, _ => {
        return drawPoly(ctx, cx, cy, r, segments, angle)
    })
}

export function neonSegment(ctx, { x1, y1, x2, y2, style, glow }) {
    neonFigure(ctx, style, glow, _ => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()        
    })
}


function drawPoly(ctx, cx, cy, r, sides, angle) {
    let points = []
    let angleInc = 2 * Math.PI / sides
    angle += Math.PI / 2 + angleInc / 2
    ctx.beginPath()
    let [ x, y ] = pointAtAngle(cx, cy, r, angle)
    ctx.moveTo(x, y)
    for (let i = 0; i < sides; i++) {
        angle += angleInc;
        [ x, y ] = pointAtAngle(cx, cy, r, angle)
        ctx.lineTo(x, y)
        points.push({ x, y })
    }
    ctx.closePath()
    ctx.stroke()
    return points
}

function pointAtAngle(x, y, r, angle) {
    return [
        x + r * Math.cos(angle),
        y + r * Math.sin(angle)
    ]
}
