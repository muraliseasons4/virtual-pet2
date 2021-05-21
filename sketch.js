var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/Happy.png");
// garden=loadImage("images/Garden.png");
// washroom=loadImage("images/WashRoom.png");
// bedroom=loadImage("images/BedRoom.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
   
  dog=createSprite(550,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("FEED DRAGO");
  feed.position(500,15);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(400,15);
  addFood.mousePressed(addFoods);
}

function draw() {
 background(46,139,87);
 foodObj.display();
 fedTime=database.ref('FeedTime');
 fedTime.on("value",function(data){
   lastFed=data.val();
 });
 fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 200,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",200,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 200,30);
   }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


//function to add food in stock
function addFoods(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
