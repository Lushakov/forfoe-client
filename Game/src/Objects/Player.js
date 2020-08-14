function Player() {
    this.type = 'round'
    this.radius = 25;
    this.kRotation = 6;
    this.rotation = 0;
    this.accel = 0.6;
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


//
//this method must be
//
Player.prototype.action = function(game, slavesList){

    if(slavesList.length){
        for(var i=0; i < slavesList.length; i++){
            if(slavesList[i].getClassName() == 'Point'){
                slavesList[i].changePosition()
                this.point++;
            }else if(slavesList[i].getClassName() == 'Asteroid'){
                console.log('asteroid');
                $('body').css({background: 'red'});
            }
        }
    }
    else $('body').css({background: '#fff'});

    this.changePosition(game);
    this.showStatus(game);
}

Player.prototype.getClassName = function() {
    return 'Player'
}

Player.className = 'Player';


Player.prototype.changePosition = function(game) {
    if(game.keyboard.left) this.rotation += this.kRotation;
    if(game.keyboard.right) this.rotation -= this.kRotation;
    

    if(game.keyboard.stop){
        this.rotation -= this.kRotation;
        this.rotation += this.kRotation;

    } else if(game.keyboard.up) {
        this.speedX += Math.cos(this.rotation * Math.PI / 180) * this.accel;
        this.speedY -= Math.sin(this.rotation * Math.PI / 180) * this.accel;

    } else if(game.keyboard.back) {
        this.speedX -= Math.cos(this.rotation * Math.PI / 180) * this.accel;
        this.speedY += Math.sin(this.rotation * Math.PI / 180) * this.accel;

    } else {
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
}

Player.prototype.showStatus = function(game) {
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
        //'game.keyboard.fire: ' + game.keyboard.fire + '<br><br>'+
        '<br><br>'+
        'point = ' + this.point
    );
}


export default Player;