function Asteroid() {
    this.type = 'round';
    this.radius = 25;
    this.kRotation = 0.5*Math.random();
    this.rotation = 0;
    this.accel = 0.4;
    this.decay = 0.9;
    this.speedX = 6 * Math.random();
    this.speedY = 6 * Math.random();
    this.maxSpeed = 25;
    this.x = Math.round($(window).width() * Math.random());
    this.y = 0;
    this.id = 'asteroid_' + this.incId();
    
    $('body').append(
        '<div class="asteroid" id="'
        + this.id + '" style="left:' 
        + (this.x - this.radius) + 'px;top:'
        + (this.y - this.radius) + 'px;"></div>'
    );
}


//
//this method must be
//
Asteroid.prototype.action = function(game, slavesList){   
    if(slavesList.length){
        for(var i=0; i < slavesList.length; i++){
            if(slavesList[i].getClassName() == 'Point'){
                slavesList[i].changePosition();
            }
        }
    }
    
    this.changePosition(); 
}

Asteroid.prototype.getClassName = function() {
    return 'Asteroid'
}

Asteroid.className = 'Asteroid';

Asteroid.prototype.changePosition = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    var width = parseInt($('body').css('width'));
    var height = parseInt($('body').css('height'));
    if(this.x + 51 <= 0 ) this.x += width+51;
    if(this.x >= width) this.x = -51;
    if(this.y + 51 <= 0 ) this.y += height+51;
    if(this.y >= height) this.y = -51;
    
    $('#'+this.id).css({
        top: this.y - this.radius,
        left: this.x - this.radius,
        transform: 'rotate(' + (-this.rotation) + 'deg)'
    });
}


Asteroid.prototype.counterId = -1;
Asteroid.prototype.incId = function(){
    Asteroid.prototype.counterId++;
    return this.counterId;
}

export default Asteroid;