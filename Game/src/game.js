import collision from './Collision'
import Player from './Objects/player.js'
import Point from './Objects/point.js'
import Asteroid from './Objects/asteroid.js'

$(document).ready(()=>{
    game.properties.docW = $(document).width();
    game.properties.docH =  $(document).height();
})

var game = {
    world: {
        player: [],
        asteroid: [],
        bullet: [],
        point: [],
        collapsar: []
    },
    shem: {
        player: ['point', 'asteroid'],  //все столкновения описаны для мастера
        asteroid: ['point'],
        bullet: false,
        point: false,
        collapsar: false
    },
    controller: {
        up: false,
        left: false,
        right: false,
        back: false
    },
    properties: {
        docW: 0,
        docH: 0,
    },
    collision: collision,
    
    start: function(){
        this.intervalID = setInterval(function(){
            let result = game.collision(game.shem, game.world);
            game.action(result); //асинхронные функции добавлять после вычисления матчасти
            //game.render.draw(game);
        }, 1000/40);
    },
    stop: function(){
        clearInterval(game.intervalID);
    },
    action: function (result) {
        for (name in result) {
            for (var i = 0; i < result[name].length; i++) {
                var listSlave = result[name][i].list;
                result[name][i].master.action(game, listSlave); //здесь slave - массив
            }
        }
        for (var name in result) {
            delete result[name];  // почему не записать пустой массив? 
        }
    },
    init: function(){
        //init objects
        game.world.player.push(new Player());
        game.world.point.push(new Point());
        game.world.asteroid.push(new Asteroid());
        game.world.asteroid.push(new Asteroid());
        game.world.asteroid.push(new Asteroid());
        game.world.asteroid.push(new Asteroid());
        game.world.asteroid.push(new Asteroid());
        //init canvas
    }
}
export default game;
