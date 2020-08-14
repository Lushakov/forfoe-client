function Point(option) {
        
    (option && option.x) ?
        this.x = option.x
        :this.x = Math.round($(window).width() * Math.random());
    
    (option && option.y) ?
        this.y = option.y
        :this.y = Math.round($(window).height() * Math.random());
   
    (option && option.radius) ?
        this.radius = option.radius
        :this.radius = 25;
    
    (option && option.name) ?
        this.name = option.name
        :this.name = 'point';
    
    this.id = 'point_' + this.incId();
    
    $('body').append(
        '<div class="point" id="'
        + this.id + '" style="left:' 
        + (this.x - this.radius) + 'px;top:'
        + (this.y - this.radius) + 'px;"></div>'
    );
}

Point.prototype.action = function(){}
Point.prototype.position = function(){
    
}
Point.prototype.counterId = -1;
Point.prototype.incId = function(){
    Point.prototype.counterId++;
    return this.counterId;
}

Point.prototype.className = 'point';
Point.prototype.type = 'round';

export default Point; 