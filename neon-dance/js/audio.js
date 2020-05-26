const sounds = {
    pop: createSound('pop'),
    boing: createSound('boing'),
    zap: createSound('zap'),
    gameover: createSound('gameover')
}

function createSound(name) {
    return new Howl({
        src: [`audio/${name}.mp3`]
    })
}

export function playSound(name) {
    let sound = sounds[name]
    if (!sound) return
    sound.play()
}