import '../public/scss/main.scss'
import Game from './game.js'

Game.init();
Game.start();

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

export default Game;