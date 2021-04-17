var tower, towerImg
var ghost, ghostImg
var climber, climberImg
var door, doorImg
 var spooky
 var doorGrp, climberGrp
 var invisible, invisibleGrp
var gamestate= "play"
var score=0

function preload(){
  towerImg= loadImage ( "tower.png")
  ghostImg =loadImage ("ghost-standing.png")
  climberImg = loadImage ("climber.png")
  doorImg = loadImage ("door.png")
  spooky = loadSound ("spooky.wav")
  
}
 function setup(){
   createCanvas (600,600)
   spooky.play();
   tower = createSprite (300,300)
   tower.addImage(towerImg)
   tower.velocityY  = 2
   
   ghost = createSprite (200,200,50,50)
   ghost.addImage(ghostImg)
   ghost.scale= 0.4
   
   
   doorGrp= createGroup();
   climberGrp= createGroup();
   invisibleGrp= createGroup();
   
   
 }

function draw(){
  background("black")
  textSize(20)
  fill("red")
  
  if (gamestate==="play"){
      score=score+Math.round(getFrameRate()/60)
      
  // reset of background
  if(tower.y > 500){
     tower.y= 300;
     }
  Spawndoors();
   if(keyDown (LEFT_ARROW)){
      ghost.x= ghost.x-3
      }
   if(keyDown(RIGHT_ARROW)){
      ghost.x= ghost.x+3
      }
   if(keyDown ("space")){
      ghost.velocityY=-5
      }
  //gravity
  ghost.velocityY= ghost.velocityY+ 0.5
  
  //ghost should sit on the climber
  if(climberGrp.isTouching(ghost)){
     ghost.velocityY=0
     }
  
  if(invisibleGrp.isTouching(ghost)||ghost.y > 600){
     ghost.destroy()
    gamestate= "end"
     }
  
  drawSprites();
    text("score" + score, 500,500)
  }
  if(gamestate=== "end"){
   stroke("yellow")  
    fill("purple")
    textSize(40)
    text("GAME OVER", 210,250)
    //stop the sound
    spooky.stop()
     }
}
function Spawndoors(){
  if (frameCount % 240 ===0){
    door= createSprite(200,-50) 
    door.addImage(doorImg)
    door.velocityY=2
    door.x= Math.round(random(120, 400))
    door.lifetime= 600
    ghost.depth= door.depth
    
   ghost.depth+=1 
    doorGrp.add(door)
    
      //climber
    
     climber= createSprite(200,10) 
    climber.addImage(climberImg)
    climber.velocityY=2
    climber.x= door.x
    climber.lifetime= 600
    climberGrp.add(climber)
    
   //invisible block
     invisible= createSprite(200,15,climber.width,2) 
   invisible.velocityY=2
   invisible.x= door.x
   invisible.lifetime= 600
    invisible.debug= true;
    invisibleGrp.add(invisible)
     
  }
  
  
}


