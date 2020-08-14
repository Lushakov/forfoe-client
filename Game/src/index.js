import '../public/scss/main.scss'
import game from './game.js'

import Player from './Objects/player.js'
import Point from './Objects/point.js'
import Asteroid from './Objects/asteroid.js'

const conf = {
    shem: {
        player: ['point', 'asteroid'],
        asteroid: ['point'],
        bullet: false,
        point: false,
        collapsar: false
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
        class: Point,
    },
    {
        class: Asteroid,
        amount: 10
    },
]

game.init(conf);
console.log(game.world);
game.fillWorld(world);
//console.log(game.world);
game.start();
/*
$('html').keydown(function(e){
    if(e.which == 37) Game.controller.left = true;
    if(e.which == 38) Game.controller.up = true;
    if(e.which == 39) Game.controller.right = true;
    if(e.which == 40) Game.controller.back = true;
    if(e.which == 32) Game.controller.stop = true;
});
$('html').keyup(function(e){
    if(e.which == 37) Game.controller.left = false;
    if(e.which == 38) Game.controller.up = false;
    if(e.which == 39) Game.controller.right = false;
    if(e.which == 40) Game.controller.back = false;
    if(e.which == 32) Game.controller.stop = false;
}); 
*/
export default game;