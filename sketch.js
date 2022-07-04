


var edges;
var ground, groundImg;
var canvas;
var bg, bgImg;
var coin, coinImg;
var gem, gemImg;
var player, playerImg;
var npc, npcImg, npc2Img;
var sword, swordImg;
var npcGroup;
var score = 0;
var coinGroup;
var clang, clangImg;
var clickSound;
var clangSound;
var bgMusic;
var ghost1, ghost1Img;
var ghost2, ghost2Img;
var ghost, ghostGroup;
var life = 3;
var gameState = "play";

function preload(){

    bgImg = loadImage("./assets/background.jpg");
    coinImg = loadImage("./assets/coin.png");
    gemImg = loadImage("./assets/gem.png");
    playerImg = loadImage("./assets/knight2.png");
    npcImg = loadImage("./assets/npc.png");
    swordImg = loadImage("./assets/sword.png");
    groundImg = loadImage("./assets/ground.png");
    npc2Img = loadImage("./assets/npc2.png");
    clangImg = loadImage("./assets/clang.png");
    clickSound = loadSound("./assets/click.mp3");
    bgMusic = loadSound("./assets/bgmusic.mp3");
    clangSound = loadSound("./assets/wrench.wav");
    ghost1Img = loadImage("./assets/ghost.png");
    ghost2Img = loadImage("./assets/ghost2.png");


}

function setup(){

createCanvas(windowWidth, windowHeight);

npcGroup = new Group
coinGroup = new Group
ghostGroup = new Group
  

//bg = createSprite(displayWidth/2-220,displayHeight/2-140,20,20);
//bg.addImage(bgImg);
//bg.scale = 2.5;

player = createSprite(displayWidth-1150, 700, 50, 50);
 player.addImage(playerImg);
   player.scale = 0.1;
  // player.debug = true;
  // player.setCollider("rectangle",0,0,1000,1000);
   edges = createEdgeSprites();
   

   sword = createSprite(player.position.x,player.position.y + 30,50,50);
   sword.addImage(swordImg);
   sword.scale = 0.4;
   sword.debug = true;
   sword.setCollider("circle",0,0,100);

   clang = createSprite(sword.position.x,sword.position.y,50,50);
   clang.addImage(clangImg);
   clang.scale = 0.4;
   clang.visible = false
   


   ground = createSprite(200,800,400,20);
ground.addImage (groundImg);
ground.x = ground.width/2;
ground.visible = false;


bgMusic.play();

}

function draw(){
    background(bgImg);

    textSize(30);
    fill("black");
    text("Score:"+score,500,50);

    textSize(30);
    fill("black");
    text("Lives:"+life,500,75);

  if(gameState == "play"){
    clang.x = sword.x
    clang.y = sword.y

  

    if (ground.x < 0){
      ground.x = ground.width/2;
      }
      if(keyDown("RIGHT_ARROW")){
        player.x = player.x+30
        sword.x = player.x  
        clang.visible = false;
      }

      if(keyDown("LEFT_ARROW")){
        player.x = player.x-30
        sword.x = player.x
        clang.visible = false;
      }

      if(keyDown("SPACE")){
        player.y = player.y -30
        sword.y = player.y
      }

      if(keyDown("Q")&& sword.x > player.x - 80){
        sword.x -= 40
        sword.y -= 20
        clickSound.play();

      }

    

     


      player.velocityY = player.velocityY + 0.5;

      sword.y = player.y;

           

     spawnNpc();
     spawnCoin();
     spawnGhosts();

     if(life <= 0){
      gameState = "end";


     }

     if(score >= 20){
      gameState = "win";

     }

  }
  if(gameState == "end"){

    textSize(50);
    fill("red");
    text("Game Over!",width/2 - 100,height/2);

    npcGroup.setVelocityEach(0);
    coinGroup.setVelocityEach(0);
    ghostGroup.setVelocityEach(0);

    npcGroup.setLifetimeEach(0);
    coinGroup.setLifetimeEach(0);
    ghostGroup.setLifetimeEach(0);

    bgMusic.stop();

  }

  if(gameState == "win"){

    textSize(50);
    fill("green");
    text("You Win!",width/2 - 100,height/2);

    npcGroup.setVelocityEach(0);
    coinGroup.setVelocityEach(0);
    ghostGroup.setVelocityEach(0);

    npcGroup.setLifetimeEach(0);
    coinGroup.setLifetimeEach(0);
    ghostGroup.setLifetimeEach(0);

  }

   
  player.collide(ground);
  
    drawSprites();
}

function spawnGhosts(){

  if (frameCount % 100 === 0){
   ghost = createSprite(100,0,10,40);
   ghost.x = random(300,1000)
   ghost.velocityY = random(3, 7)

   rand = Math.round(random(1,2));
switch(rand){

  case 1: ghost.addImage(ghost1Img); 
          break;
  case 2: ghost.addImage(ghost2Img);
          break;

  default: break;
}
ghost.scale = random(0.3, 0.5);

ghostGroup.add(ghost);

ghost.liftime = 1000;

handleGhost();
}

}

function handleGhost(){
  
  sword.overlap(ghostGroup, function(collector, collected) {
    clangSound.play();
    clang.visible = true;
    life = life - 1;
    collected.remove();
  });
}

function handleNpc(){
  
  sword.overlap(npcGroup, function(collector, collected) {
    clangSound.play();
    clang.visible = true;
    score = score + 1;
    collected.remove();
  });
}

function handleCoin(){

sword.overlap(coinGroup, function(collector, collected){
score = score + 3;
collected.remove();
});

}

function spawnCoin(){

  if (frameCount % 60 === 0){
    coin = createSprite(0,700,10,40);
    coin.velocityX = random(3, 7)
 
    rand = Math.round(random(1,2));
 switch(rand){
 
   case 1: coin.addImage(coinImg); 
           break;
   case 2: coin.addImage(gemImg);
           break;
 
   default: break;

  }
  coin.scale = 0.25;
  coinGroup.add(coin);
  coin.liftime = 1000;
  handleCoin();
  }
 
}

function spawnNpc(){

  if (frameCount % 60 === 0){
   npc = createSprite(0,700,10,40);
   npc.velocityX = random(3, 7)

   rand = Math.round(random(1,2));
switch(rand){

  case 1: npc.addImage(npcImg); 
          break;
  case 2: npc.addImage(npc2Img);
          break;

  default: break;
}
npc.scale = random(0.3, 0.5);

npcGroup.add(npc);

npc.liftime = 1000;

handleNpc();
}

}
