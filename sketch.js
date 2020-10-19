//Create variables here
var pet,dog,dog1;
var database,foods;
var feed,addfood;
var foodstock,foodobject,feedtime,lastfed;
function preload(){
dog=loadImage("images/dogImg.png");
dog1=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 700);
  database=firebase.database();
  pet=createSprite(200,200,50,50);
  pet.addImage(dog);
  pet.scale=0.2;
 foodstock=database.ref("food");
  foodstock.on("value",readstock)
feed=createButton("feed the dog");
feed.position(600,95);
feed.mousePressed(feedDog);
addfood=createButton("add food");
addfood.position(700,95);
addfood.mousePressed(addfoods);

}


function draw() {  
 background(46,139,87);
 foodobject.display();
feedtime=database.ref("time");
feedtime.on("value",function(data){
  lastfed=data.val();
});

 fill("white");
 textSize(20);
 text("food remaning"+foods,270,200);
  drawSprites();
  //add styles here

}
function readstock(data){
  foods=data.val();
  foodobject.updatefoodstock(foods)
}
function writestock(x){
  if (x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({
    food:x
  })
}
function addfoods(){
  foods++;
  database.ref("/").update({
    food:foods
  })
}
function feedDog(){
  pet.addImage(dog1);
  foodobject.updatefoodstock(foodobject.getfoodstock()-1);
  database.ref("/").update({
    food:foodobject.getfoodstock(),
    time :hour ()
  })
}