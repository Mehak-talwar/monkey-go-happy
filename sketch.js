var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey_collided;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collided = loadAnimation("sprite_0.png");
}



function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();
  
}


function draw() {
  background(255);

  textSize(15);
  text("Score: "+ score, width-120,60);
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
       if(ground.x<0) {
           ground.x = ground.width/2;
       }
  
       if(keyDown("space") && monkey.y > 300) {
         monkey.velocityY = -12;
       }
       monkey.velocityY = monkey.velocityY + 0.8;
       
       ground.velocityX = -(6 + score/100);
       score = score + Math.round(getFrameRate()/65);
        
       if(obstaclesGroup.isTouching(monkey)){
         gameState = END;
       } 
       spawnBananas();
       spawnObstacles();
  }
  
  if (gameState === END) {     
     ground.velocityX = 0;
     monkey.velocityY = 0
     
     monkey.changeAnimation("collided", monkey_collided);
     
     obstaclesGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
     fill("black");
     textSize(20);
     text("GAME OVER", 150,150);
  }
  
  drawSprites();
}
function spawnObstacles(){
 if (frameCount % 100 === 0){
   var obstacle = createSprite(400,320,20,30);
   obstacle.velocityX = -4;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.13;
   obstacle.lifetime = 100;
   
   obstaclesGroup.add(obstacle);
 }
}

function spawnBananas() {
  if (frameCount % 100 === 0) {
    banana = createSprite(400,190,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -4;
    
    banana.lifetime = 100;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  }
}




  