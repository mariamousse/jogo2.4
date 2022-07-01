var backImg;
var ship, shipImg;
var laser, laserG;
var shot = 3;
var enemy, enemyG, enemyPL;
var pdc, pdcG;
var municao, municaoG, municaoImg;
var gamestate = "play";
var coin1, coin2, coin3, coin4, coin1G, coin2G, coin3G, coin4G;
var money = 0;
var score = 0;
var var1 = 0;
var var2 = 0;
var playButton, menuButton, shopButton, playImg, menuImg, shopImg;
 
 
function preload(){
 //fundoImg = loadImage("");
 enemyPL = loadAnimation("enemy-piscando.gif");
 municaoImg = loadImage("munição-icone.png");
 
 
}
 
function setup() {
 createCanvas(windowWidth,windowHeight);
 //fundo = createSprite();
 
 playButton = createSprite(windowWidth/2, windowHeight/2 + 100, 200, 88);
 playButton.visible = false;
 menuButton = createSprite(windowWidth/2 - 300, windowHeight/2 + 100, 200, 88);
 menuButton.visible = false;
 ship = createSprite(120,200, 102, 102);
 ship.visible = false;
 laserG = new Group(); 
 enemyG = new Group();
 pdcG = new Group();
 municaoG = new Group();
 coin1G = new Group();
 coin2G = new Group();
 coin3G = new Group();
 coin4G = new Group();
 
 
}
 
function draw() {
 background("black")
 drawSprites()
 var1 += 1;
 var2 += 1;
 
 
 //play; colisões, propriedades, etc...
 if(gamestate == "play"){
     fill("orange");
     textSize(20);
     text(score, 500,50);
     text("shot: " + shot, 120, 30);
     text("dinheiro: " + money, 120,50)
    
     ship.velocityY = 2.5;
     ship.velocityX = 0;
     ship.visible = true;
    
     playButton.visible = false;
     menuButton.visible = true;
     menuButton.x = 1300;
     menuButton.y = 50;
     menuButton.scale = 0.5;

     //mudanças de gamestate e butões;
     if(mousePressedOver(menuButton)){
        gamestate = "menu"
        menuButton.x = windowWidth/2 -300;
        menuButton.y = windowHeight/2 +100;
        menuButton.scale = 1;
        //reset();
        console.log("a");
     }
    
     //movimentos ship e propriedades.
     if(keyDown("w")  && var2 > 15){
         ship.y = ship.y - 100;
         var2 = 0;
        }
     if(keyDown("s") ){
         ship.y = ship.y + 1;
        }
     if(keyDown("d") ){
         ship.x = ship.x + 7.5;
        }
     if(keyDown("a") ){
         ship.x = ship.x - 7.5;
        }
     if(ship.x < 0){
         ship.x = 0;
        }
     if(ship.x > windowWidth){
         ship.x = windowWidth;
        }
     if(ship.y < -102){
         gamestate = "end";
        }
     if(ship.y > windowHeight + 102){
         gamestate = "end";
        }
     //gerar laser
     if(keyDown("space") && shot > 0 && var1 > 50){
         createLaser();
         shot = shot - 1;
         var1 = 0;
        }
     //gerar pedaço
     if(frameCount % 500 == 0 ){
         createPedaço();
        }
     //gerar inimigos
     if(frameCount % 150 == 0 ){
         createEnemy();  
        }
     //gerar municao
     if(frameCount % 400 == 0 ){
         createMunicao();
        }
     //gerar coins
     if(frameCount % 1000 == 0){
         createCoins();
        }
     //collide/istouching
     if(laserG.isTouching(enemyG) ){
         laserG.destroyEach();
         enemyG.destroyEach();
         score = score + 1;
        }
     if(enemyG.isTouching(ship)){
         gamestate = "end";
        }
     if(ship.isTouching(municaoG) && shot < 7){
         shot += 3;
         municaoG.destroyEach();
        }
     else if(ship.isTouching(municaoG) && shot > 6 && shot < 9){
         municaoG.destroyEach();
         shot = 9;
        }
     if(ship.isTouching(coin1G) ){
         coin1G.destroyEach();
         money += 1;
        }
     if(ship.isTouching(coin2G) ){
         coin2G.destroyEach();
         money += 1;
        }
     if(ship.isTouching(coin3G) ){
         coin3G.destroyEach();
         money += 1;
        }
     if(ship.isTouching(coin4G) ){
         coin4G.destroyEach();
         money += 1;
        }

    }
 
 //end; botões, reset, contabilizar pontos, etc...
 if(gamestate == "end"){
     fill("orange")
     textSize(50)
     text("Fim de Jogo", windowWidth/2 -140,  windowHeight/2);
     playButton.visible = true;
     menuButton.visible = true;
        if(mousePressedOver(playButton)){
         gamestate = "play";
         reset();
        }
        if(mousePressedOver(menuButton)){
         gamestate = "menu";
         //reset();
        }
    }

 //menu; botões, futura loja, pontos gerais, etc...
 if(gamestate == "menu"){
     playButton.visible = true;
     menuButton.visible = false;
     if(mousePressedOver(playButton)){
     gamestate = "play";
         reset();
        }
    }
 ship.collide(pdcG);
 
 //text(x =  mouseX, 120,20);
 //text(y =  mouseY, 120,50);
 
}
 
function createLaser(){
 //gerar os lasers
 laser = createSprite(ship.x + 30, ship.y, 100,20);
 laser.velocityX = 30;
 //laser.addImage();
 laser.lifetime = 90;
 laserG.add(laser);
}
function createEnemy(){
 //gerar os inimigos
 enemy = createSprite(1500, random(50, windowHeight - 50), 50,50);
 enemy.addAnimation( "piscando",enemyPL);
 //enemy.scale = 2.5;
 enemy.velocityX = -10;
 enemy.lifetime = 200;
 enemyG.add(enemy);
}
function createPedaço(){
 pdc = createSprite(1500, random(100, windowHeight - 50), 200,100);
 pdc.velocityX = -7;
 pdc.lifetime = 400;
 pdcG.add(pdc);
}
function createMunicao(){
 municao = createSprite(1500,random(25, windowHeight - 50), 25, 25);
 municao.addImage("icone", municaoImg);
 municao.velocityX = -8;
 municao.scale = 1
 municao.lifetime = 300;
 municaoG.add(municao);
}
function createCoins(){
 coin1 = createSprite(1500, random(40,windowHeight - 300), 35,35);
 coin2 = createSprite(coin1.x - 40, coin1.y + random(0,100),35,35);
 coin3 = createSprite(coin2.x - 40, coin2.y + random(0,100),35,35);
 coin4 = createSprite(coin3.x - 40, coin3.y + random(0,100),35,35);
 coin1.velocityX = -15;
 coin2.velocityX = -15;
 coin3.velocityX = -15;
 coin4.velocityX = -15;
 coin1.lifetime = 100;
 coin2.lifetime = 100;
 coin3.lifetime = 100;
 coin4.lifetime = 100;
 coin1G.add(coin1);
 coin2G.add(coin2);
 coin3G.add(coin3);
 coin4G.add(coin4);
}
 
function reset(){
 var1 = 0;
 var2 = 0;
 frameCount = 0;

 coin1G.destroyEach();
 coin2G.destroyEach();
 coin3G.destroyEach();
 coin4G.destroyEach();
 municaoG.destroyEach();
 pdcG.destroyEach();
 enemyG.destroyEach();
 laserG.destroyEach();
 ship.x = 120;
 ship.y = 200;
}