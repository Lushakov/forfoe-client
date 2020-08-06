import collision from './Collision'
import Player from './Objects/player.js'
import Point from './Objects/point.js'
import Asteroid from './Objects/asteroid.js'

/*

conf - "option"
n - "name"
e - "event"

*/

class Game {
    constructor(conf) {
        try {
            if (!conf) throw new SyntaxError('config not found');
            if (!conf.shem) throw new SyntaxError('schem not found');
        }
        catch (err) console.log(err);
    
        createShem(conf)
        createWorld(conf);
        createKeyboard(conf);
        cerateProperties(conf);
    }

    static createShem(conf) {
        this.shem = conf.shem;
    }
    static createWorld(conf) {
        for(n in conf.shem) this.world[n] = [];
    }
    static createKeyboard(conf) {
        if (!conf.keyboard) return;

        for(n in conf.keyboard) {
            this.keyboard[n] = false;

            $('html').keydown(e => 
                e.which == conf.keyboard[n] ? 
                    this.keyboard[n] = true);

            $('html').keyup(e => 
                e.which == conf.keyboard[n] ? 
                    this.keyboard[n] = false);
        }
    }
    static cerateProperties(conf) {
        if (conf.properties)
        $(document).ready(()=>{
            this.properties.docW = $(document).width();
            this.properties.docH =  $(document).height();
        })
    }
}
var game = {
    
    
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
        for(let i=0; i<10; i++) {
            game.world.asteroid.push(new Asteroid());
        }
        //init canvas
    }
}
export default game;
