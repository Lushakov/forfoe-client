import game from './Core'

import Player from './Objects/Player.js'
import Point from './Objects/Point.js'
import Asteroid from './Objects/Asteroid.js'

const conf = {
    shem: {
        Player: ['Point', 'Asteroid'],
        Asteroid: ['Point'],
        Bullet: false,
        Point: false,
        Collapsar: false
    },
    keyboard: {
        left: 37,
        up: 38,
        right: 39,
        back: 40,
        stop: 32
    }
}

const world = [
    {
        class: Player,
    },
    {
        class: Asteroid,
        amount: 10
    },
    {
        class: Point,
    },
]

game.init(conf);
game.fillWorld(world);
game.start();

export default game;