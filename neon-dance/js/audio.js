let soundNames = 'pop boing zap gameover'
let sounds = {}
let music

function createSounds() {
    let names = soundNames.split(' ')
    for (let name of names) {
        sounds[name] = new Howl({
            src: [`audio/${name}.mp3`]
        })
    }
}

export function startMusic(loopEnd) {
    music = new Howl({
        src: [`audio/music.mp3`],
        loop: true,
        volume: 0.4,
        onend: () => loopEnd(music)
    })
    music.play()
}

export function stopMusic() {
    music.stop()
}

export function playSound(name) {
    let sound = sounds[name]
    if (!sound) return
    sound.play()
}

createSounds()
