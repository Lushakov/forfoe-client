import collision from './collision'
import objCreater from './objCreater'



const game = {}


game.collision = collision;


game.init = (config) => { 
//the "conf" Object contains Objects "shem", "keyboard" and "properties"

    try {
        if (!config) throw new SyntaxError('config not found');
        if (!config.shem) throw new SyntaxError('schem not found');
    }
    catch(err) {
        console.log(err);
    }    

    objCreater.shem(game, config)
    objCreater.world(game, config);
    objCreater.keyboard(game, config);
    objCreater.properties(game, config);
    
    game._collisionCheckResult = {};
}


game.fillWorld = (arr) => { 
//the "arr" Array contains Objects of the type: 
//{"class": [[Class]], "properties": [[Object]], "amount": [[Number]]}

    for(let item of arr) {
        let className  = item.class.className;
        let properties = item.properties;
        let amount     = item.amount || 1;
        for(let i=0; i < amount; i++) {
            game.world[className].push(new item.class(properties));
        }
    }
}


game.start = () => {
    game.intervalID = setInterval(() => {
        game._collisionCheckResult = game.collision(game.shem, game.world);
        game.action();
    }, 1000/40);
}


game.stop = () => {
    clearInterval(game.intervalID);
}


game.action = () => {
    const result = game._collisionCheckResult;

    for (let className in result) {
        for (let i=0; i < result[className].length; i++) {

            let list = result[className][i].list;    //list of objects collided with the master

            result[className][i].master.action(game, list); 
        }
    }
    for (let name in result) {
       delete result[name];    //(better to remove with handles)
    }
}


export default game;