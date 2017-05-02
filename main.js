

function startGame() {
    Game.start();
    main();
    }

var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
    })();
var Game = {
    canvas : document.createElement("canvas"),
    start: function() {
        this.canvas.width = WIDTH;
        this.canvas.height = HEIGHT;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(update(), 250);
        this.inGame = true;
        },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    }
//request key functions, down and up.
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
    }, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
    }, false);

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    Game.clear();
    update();
    gameTime = dt;
    lastTime = now;
    requestAnimFrame(main);
    return gameTime;
    };
 
 
class Vector{
    constructor(x,y,direction){ //1 is right; -1 is left; 2 is up; -2 is down;
        this.x=x;
        this.y=y;
        this.magnitude = 10;
        this.direction = direction;
        this.dx = this.magnitude
        this.dy = -this.magnitude
    }
    
    distanceToX(vector){
        Math.sqrt(this.x**2+vector.x**2);
    }
    
    distanceToY(vector){
        Math.sqrt(this.y**2+vector.y**2);
    }
}

    
class Entity{
    constructor(x,y,width,height,src){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = src;
        this.vector = new Vector(this.x+this.width/2, this.y+this.height/2, 1);
    }
    
    bounce(){
        if(this.x >= WIDTH || this.x <=0){
            this.vector.dx = -this.vector.dx;
        }if(this.y >= HEIGHT || this.y <= 0){
            this.vector.dy = -this.vector.dx;
        }
        
        this.x += this.vector.dx;
        this.y += this.vector.dy;
        
    }
    
    
}

function addText(string, x,y, size, color){//color is a string eg. "red"
    Game.context.font = size+"px Arial";
    Game.context.fillStyle = color;
    return Game.context.fillText(string, x,y);
}

function collide(a,b){
   if (a.x < b.x + b.width &&
   a.x + a.width > b.x &&
   a.y < b.y + b.height &&
   a.height + a.y > b.y) {
        return true;
    }else{
        return false;
    }
}

function actions(obj){
    if(38 in keysDown){
        obj.y -= obj.vector.magnitude;
    }if(39 in keysDown){
        obj.x +=obj.vector.magnitude;
    }if(37 in keysDown){
        obj.x -= obj.vector.magnitude;
    }if(40 in keysDown){
        obj.y += obj.vector.magnitude;
    }
}


function loadObjects(items){
    for(var i = 0; i < items.length; i++){
        Game.context.drawImage(items[i].image, items[i].x,items[i].y, items[i].width, items[i].height);
    }
}
// game-loop
function update(){
   loadObjects(sprites);
   ball.bounce();
   actions(ball2);
  
    
    }


var lastTime;
var HEIGHT = 400;
var WIDTH = 400;
var gameTime = 0;
var keysDown = {};

//Entities
var ball =  new Entity(100,100, 50,50, "ball.png");
var ball2 = new Entity(200,200, 50,50, "ball.png")
var sprites = [ball,ball2];
