import Point from './point.js';
//import bullet from './bullet.js'
    
function Player() {
    this.radius = 25;
    this.kRotation = 6;
    this.rotation = 0;
    this.accel = 0.5;
    this.decay = 0.9;
    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 25;
    this.x = 100;
    this.y = 100;
    
    this.point = 0;
    
    this.sprite = '';
    this.height = '';
    this.width = '';
}
Player.prototype.action = function(game, slave){
    if(slave.length){
        for(var i=0; i<slave.length; i++){
            if(slave[i].class == 'point'){
                var n = slave[i]._n;
                console.log(n);
                $('#' + slave[i].id).detach();
                delete game.world.point[n];    //'элемент массива в ворлде теперь андефайнд.
                game.world.point.splice(n, 1); /*определение столкновений определяется последовательно от 0 до крайнего элемента массива ворлд. 
                Сохраняються столкновения соответственно. Отсюда: удаление пустых элементов массива ворлд должно происходить в обратном направлении*/

                game.world.point.push(new Point());
                console.log('coll');
                
                this.point++;
            }else if(slave[i].class == 'asteroid'){
                console.log('asteroid');
                $('body').css({background: 'red'});
            }
        }
    }else{
        //если нет столкновений
        $('body').css({background: '#fff'});
    }
    
    if(game.keyboard.left) this.rotation += this.kRotation;
    if(game.keyboard.right) this.rotation -= this.kRotation;
    

    if(game.keyboard.stop){
        this.rotation -= this.kRotation;
        this.rotation += this.kRotation;
        //this.speedX = 5;
        //this.speedY = 5;
    }else
    if(game.keyboard.up) {
        this.speedX += Math.cos(this.rotation * Math.PI / 180) * this.accel;
        this.speedY -= Math.sin(this.rotation * Math.PI / 180) * this.accel;
    } else if(game.keyboard.back) {
        this.speedX -= Math.cos(this.rotation * Math.PI / 180) * this.accel;
        this.speedY += Math.sin(this.rotation * Math.PI / 180) * this.accel;
    }else{
        this.speedX *= this.decay;
        this.speedY *= this.decay;
    }
    if(Math.abs(this.speedX) > this.maxSpeed) this.speedX = this.speedX/(Math.abs(this.speedX)/this.maxSpeed);
    if(Math.abs(this.speedY) > this.maxSpeed) this.speedY = this.speedY/(Math.abs(this.speedY)/this.maxSpeed);
    this.x += this.speedX;
    this.y += this.speedY;
    
    var width = parseInt($('body').css('width'));
    var height = parseInt($('body').css('height'));
    if(this.x + 51 <= 0 ) this.x += width+51;
    if(this.x >= width) this.x = -51;
    if(this.y + 51 <= 0 ) this.y += height+51;
    if(this.y >= height) this.y = -51;
    
    $('#player').css({
        top: this.y - this.radius,
        left: this.x - this.radius,
        transform: 'rotate(' + (-this.rotation) + 'deg)'
    });
    /*
    if(game.keyboard.fire)
        game.world.bullet.push(new bullet({
            rotation: this.rotation,
            x: this.x,
            y: this.y
        }));
    */
    // info

    $('#info').html(
        'rotation: ' + this.rotation + '<br>' +
        'top: ' + Math.round(this.y) + '<br>' +
        'left: ' + Math.round(this.x) + '<br><br>' +
        'player.speedX: ' + Math.round(this.speedX*100)/100 + '<br>' +
        'player.speedY: ' + Math.round(this.speedY*100)/100 + '<br><br>' +
        'game.keyboard.left: ' + game.keyboard.left + '<br>' +
        'game.keyboard.right: ' + game.keyboard.right + '<br>' +
        'game.keyboard.up: ' + game.keyboard.up + '<br>'+
        'game.keyboard.back: ' + game.keyboard.back + '<br>'+
        'game.keyboard.fire: ' + game.keyboard.fire + '<br><br>'+
        'point = ' + this.point
    );
}

Player.prototype.render = function(){
}
Player.prototype.class = 'player';
Player.prototype.type = 'round';


export default Player;