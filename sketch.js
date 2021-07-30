const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bridge;
var leftSide, rightSide, jointPoint2, jointPoint1;
var jointLink;
var ground;
//var stone;
var stones = [];
var bgImg, stoneImg, logImg, zombieImg, axeImg;
var sadImg;
var zombie;
var breakButton;
var axe;
var collided = false;

function preload()
{
  bgImg = loadImage('background.png');
  stoneImg = loadImage('stone.png');
  logImg = loadImage('wood.png');
  zombieImg = loadImage('zombie.png');
  axeImg = loadImage('axe.png'); 
  sadImg = loadImage('deadzombie.png');
}

function setup() {
  createCanvas(1700, 775); 
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  jointPoint2 = new newBase(width-250, height/2 - 100, 40, 20);
  ground = new newBase(0, height-10, width*2, 20);

  bridge = new createBridge(25, {x:50,y:height/2 - 140}); 
  rightSide = new newBase(width-100, height-300, 200, height/2 + 100);
  leftSide = new newBase(100, height-300, 200, height/2 + 100); 

  Matter.Composite.add(bridge.body, jointPoint2);
  jointLink = new newLink(bridge, jointPoint2);

  for (var i = 0; i <= 8; i++)
  {
    var x = random( width / 2 - 200, width / 2 + 300);
    var y = random( -100, 100);
    var stone = new createStone(x, y, 100, 100);
    stones.push(stone);
  }

  zombie = createSprite(width/2 - 500, height - 110, 10, 10);
  zombie.addImage("sad", sadImg);
  zombie.addImage("running", zombieImg);
  zombie.changeImage("running");
  zombie.scale = 0.15;
  zombie.velocityX = 2;

  breakButton = createButton("Cut the Rope");
  breakButton.position(width-200, height/2 - 50);
  breakButton.size(100, 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);

}

function draw() {
  background(bgImg);  
  Engine.update(engine);

  bridge.show();

  leftSide.display();
  rightSide.display();
  jointPoint2.display();

  for (var i = 0; i <=8; i++)
  {
    stones[i].display();
    var pos = stones[i].body.position;
    var distance = dist(zombie.position.x, zombie.position.y, pos.x, pos.y);
    if (distance <= 50)
    {
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stones[i].body, {x:10,y:-10});
      zombie.changeImage("sad");
      collided = true;
    }
  }
  
  drawSprites();
}

function handleButtonPress()
{
  jointLink.detach();

  setTimeout(() => {
    bridge.break();
  }, 1500);
  jointLink = null;
}