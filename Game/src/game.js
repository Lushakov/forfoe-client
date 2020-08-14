import collision from './Collision'
import objCreater from './objCreater'

import Player from './Objects/player.js'
import Point from './Objects/point.js'
import Asteroid from './Objects/asteroid.js'


const game = {}

game.collision = collision;

game.init = (conf) => { //there is Object "conf" which contains Objects "shem", "keyboard" and "properties"
    try {
        if (!conf) throw new SyntaxError('config not found');
        if (!conf.shem) throw new SyntaxError('schem not found');
    }
    catch(err) {
        console.log(err);
    }    

    objCreater.shem(game, conf)
    objCreater.world(game, conf);
    objCreater.keyboard(game, conf);
    objCreater.properties(game, conf);

/*
        game.world.player.push(new Player());
        game.world.point.push(new Point());
        for(let i=0; i<10; i++) {
            game.world.asteroid.push(new Asteroid());
        }
        */
}

game.fillWorld = (arr) => { //there is Array "conf" which contains Objects of the type: {"class": [[linkToClass]], "properties": [[Object]], "amount": [[Number]]}
    for(let item of arr) {
        const className = item.class.className;
        const properties = item.properties;
        const amount = item.amount || 1
        console.log(item);
        console.log(item.class.className);
        console.log(game.world[className]);
        for(let i=0; i < amount; i++) {
            game.world[className].push(new item.class(properties));
        }
    }
}

game.start = () => {
    game.intervalID = setInterval(function(){
        let result = game.collision(game.shem, game.world);
        game.action(result); //асинхронные функции добавлять после вычисления матчасти
        //game.render.draw(game);
    }, 1000/40);
}

game.stop = () => {
    clearInterval(game.intervalID);
}

game.action = (result) => {
    for (name in result) {
        for (var i=0; i < result[name].length; i++) {
            var listSlave = result[name][i].list;
            result[name][i].master.action(game, listSlave); //здесь slave - массив
        }
    }
    for (var name in result) {
        delete result[name];  // почему не записать пустой массив? //потому что это ссылка. //объект не должэен удалитья автоматическ? - лучше явно
    }
}

export default game;
