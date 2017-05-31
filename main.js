

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
        this.costume = this.animate({
            context: Game.context,
            width: this.width,
            height: this.height,
            image: this.image,
            x: this.x,
            y:this.y,
            numberOfFrames: 4,
            ticksPerFrame:5 });
        this.assets= [
            "img/character/frontIdle.png",
            "img/character/backIdle.png",
            "img/character/leftWalk.png",
            "img/character/rightWalk.png",
            "img/character/frontSlash.png",
            "img/character/backSlash.png"];
        this.action = {
            "backSlash":["qb", 0,this.assets[5]], 
            "frontSlash": ["qf", 1, this.assets[4]],
            "leftWalk": ["la",0, this.assets[2]],
            "rightWalk": ["ra",1, this.assets[3]],
            "frontIdle": ["na",1, this.assets[0]],
            "backIdle": ["na", 0, this.assets[1]]

             };
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
    
    animate(options){
      var costume = {},
            frameIndex = 0,
            tickCount = 0,
            ticksPerFrame = options.ticksPerFrame || 0,
            numberOfFrames = options.numberOfFrames || 1;
        
        costume.context = options.context;
        costume.width = options.width;
        costume.height = options.height;
        costume.image = options.image;
        costume.x = options.x;
        costume.y = options.y;

        
        costume.update = function () {
            tickCount += 1;
            if (tickCount > ticksPerFrame) {
                tickCount = 0;
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {  
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
        
        costume.render = function () {
          // Draw the animation
          Game.context.drawImage(
            //scaled images.
            costume.image,
            (frameIndex * costume.width / numberOfFrames),
            0,
            (costume.width / numberOfFrames),
            costume.height,
            costume.x,
            costume.y,
            (costume.width / numberOfFrames),
            costume.height);
        };
        return costume;
     }
 
    update(){
        this.costume.x = this.x;
        this.costume.y = this.y;
        this.costume.render();
        this.costume.update();   
     	}   
}


function moveUpdate(obj, key){

    var moves = getDicValues(obj.action);
    // left is 0, right is 1
        if (moves[0][0]== key && moves[0][1] == obj.vector.direction){
                return moves[0][2];
        }if ( moves[1][0]== key && moves[1][1] == obj.vector.direction){
                return moves[1][2];
        }if ( moves[2][0]== key && moves[2][1] == obj.vector.direction){
                return moves[2][2];
        }if ( moves[3][0]== key && moves[3][1] == obj.vector.direction){
                return moves[3][2];
        }else{
            if (obj.vector.direction == 1){
            return moves[4][2];
        }else{
            return moves[5][2];
        }

            }
    }


function checkDirection(a, b){
    if (a.vector.direction == b.vector.direction || 
        a.vector.direction == b.vector.direction[0] ||
        a.vector.direction == b.vector.direction[1]){
        return true;
    } else{
        return false;
    }
    }



function random(num){
    return Math.floor(Math.random()*num);
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
