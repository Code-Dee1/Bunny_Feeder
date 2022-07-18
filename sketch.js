const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3; 

var bg_img;
var food;
var rabbit,blower;

var button, button1, button2
var bunny;
var blink,eat,sad;
var mute_button;
var rope1,rope2;

var rope_cut, eat_sound, foliage, bg_sound, air, sad_sound

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");

  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 

  rope_cut = loadSound('rope_cut.mp3');
  eat_sound = loadSound('eating_sound.mp3');
  foliage = loadSound('Foliage.mp3');
  bg_sound = loadSound('sound1.mp3');
  air = loadSound('air.wav');
  sad_sound = loadSound('sad.wav');
}

function setup() {
  createCanvas(500,700);
  frameRate(80);
  bg_sound.play()
  bg_sound.setVolume(0.5)

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  button1 = createImg('cut_btn.png');
  button1.position(330,35);
  button1.size(50,50);
  button1.mouseClicked(drop2);

  button2 = createImg('cut_btn.png');
  button2.position(360,200);
  button2.size(50,50);
  button2.mouseClicked(drop3);




  
  blower = createImg('blower.png')
  blower.position(10,250)
  blower.size(150,100)
  blower.mouseClicked(airblow)
  mute_button=createImg('mute.png');
  mute_button.position(450,20)
  mute_button.size(50,50)
  mute_button.mouseClicked(mute)

  rope = new Rope(8,{x:40,y:30});
  rope1 =  new Rope(7,{x:370,y:40});
  rope2 = new Rope(4,{x:400,y:225});
  ground = new Ground(200,690,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;

  bunny = createSprite(230,620,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);

  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope1,fruit);
  fruit_con_3 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  rope1.show();
  rope2.show();
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eat_sound.play()
  }
   
  if(collide(fruit,ground.body)==true )
  {
     bunny.changeAnimation('crying');
     sad_sound.play()
   }

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
  rope_cut.play()
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0}, {x:0.01,y:0})
  air.play()
}

function mute(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else{
    bg_sound.play()
  }
}

function drop2()
{
  rope1.break();
  fruit_con_2.dettach();
  fruit_con_2 = null; 
  rope_cut.play()
}

function drop3()
{
  rope2.break();
  fruit_con_3.dettach();
  fruit_con_3 = null; 
  rope_cut.play()
}

