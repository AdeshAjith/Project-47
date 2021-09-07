var Fighter,FighterImage
var backGround
var Meteor,MeteorImage
var Laser
var score = 0
var count = 0
var a = 125
var b = 80
var c = 50
var level = 1
var gamestate = "play"

function preload(){
  FighterImage = loadImage("images/SpaceFighter.png")
  backGround = loadImage("images/Space.jpg")
  MeteorImage = loadImage("images/Meteor.png")
}

function setup() {

  createCanvas(1200,650);

  Fighter = createSprite(600,550)
  Fighter.addImage(FighterImage)
  Fighter.scale = 0.12

  MeteorGroup = new Group()
  LaserGroup = new Group()
}

function draw() {
  background(backGround); 
  
  if(gamestate === "play"){
    textSize(18)
    fill("white")
    text("Score: "+score,1050,50)
    text("Level "+level,1050,75)
    Fighter.velocityX = 0
    Fighter.velocityY = 0

    Meteors()
  
    if(keyDown(RIGHT_ARROW)){
      Fighter.velocityX = 7
    }

    if(keyDown(LEFT_ARROW)){
      Fighter.velocityX = -7
    }

    if(keyWentDown("space") && count === 0 ){
      Laser = createSprite(Fighter.x,540,5,17)
      Laser.velocityY = -5
      Laser.lifetime = 200
      Laser.shapeColor = "red"
      LaserGroup.add(Laser)
      count = 1  
    }
    for(var i = 0;i < MeteorGroup.length;i++){
      if(MeteorGroup[i].isTouching(LaserGroup)){
        MeteorGroup[i].destroy()
        score = score+50
      }
      if(MeteorGroup[i]!=undefined){ 
        if(Fighter.isTouching(MeteorGroup[i])){
          MeteorGroup[i].destroy()
          score = score-100
        }
        if(MeteorGroup[i].y>650){
          gamestate = "end"
        }
      } 
    }

    if(Laser!=undefined){
      if(Laser.lifetime<175){
        count = 0
      }
    }

    if(score<0){
      gamestate = "end"
    }
    

    Fighter.display() 
    drawSprites();
  }
  if(gamestate === "end"){
    MeteorGroup.destroyEach()
    LaserGroup.destroyEach()
    textSize(50)
    fill("white")
    text("Game Over",500,300)
    textSize(30)
    text("Score: "+score,1000,50)
  }
}

function Meteors(){
  if(score<=150){
    if(frameCount%a === 0){
      var rand = Math.round(random(300,900))
      Meteor = createSprite(rand,-50)
      Meteor.addImage(MeteorImage)
      Meteor.velocityY = 4
      Meteor.scale = 0.07
      Meteor.lifetime = 200
      MeteorGroup.add(Meteor)
      level = 1
    }
  }
  else if(score>150 && score<=500){
    if(frameCount%b === 0){
      var rand = Math.round(random(300,900))
      Meteor = createSprite(rand,-50)
      Meteor.addImage(MeteorImage)
      Meteor.velocityY = 4
      Meteor.scale = 0.07
      Meteor.lifetime = 200
      MeteorGroup.add(Meteor)
      level = 2
    }
  }
  else if(score>500){
    if(frameCount%c === 0){
      var rand = Math.round(random(300,900))
      Meteor = createSprite(rand,-50)
      Meteor.addImage(MeteorImage)
      Meteor.velocityY = 4
      Meteor.scale = 0.07
      Meteor.lifetime = 200
      MeteorGroup.add(Meteor)
      level = 3
    }
  }
}
