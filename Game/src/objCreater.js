const objCreater = {};

//here uses 'lodash' as ​​_ 
//it's available everywhere, see webpack config

objCreater.shem = (game, conf) => {
    game.shem = _.cloneDeep(conf.shem); 
}


objCreater.world = (game, conf) => {
    game.world = {};
    for(let n in conf.shem) game.world[n] = [];
}


objCreater.keyboard = (game, conf) => {
    if (!conf.keyboard) return;

    game.keyboard  = {};
    for(let n in conf.keyboard) {
        game.keyboard[n] = false;

        $('html').keydown(e => {
            if(e.which == conf.keyboard[n])
                game.keyboard[n] = true
        });

        $('html').keyup(e => {
            if(e.which == conf.keyboard[n])
                game.keyboard[n] = false
        });
    }
}


objCreater.properties = (game, conf) => {
    game.properties = {};

    if (conf.properties) game.properties = _.cloneDeep(conf.properties)

    $(document).ready(() => {
        game.properties.docW = $(document).width();
        game.properties.docH = $(document).height();
    })
}

export default objCreater;
