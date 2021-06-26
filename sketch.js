var rocketImg, rocket;
var asteriod1Img, asteroid1, asteroid1Group;
var starImg, star, starGroup;
var laserImg, laser;
var spaceImg, space;
var gameState = "play";
var blastImg;
var fuelImg, fuel, fuelGroup;
var starCount = 0;
var fuelCount = 500;
var distance = 0;
var alienImg, alien, alienGroup;
var explosionSound;
var gameOverImg, gameOver;


function preload() {

	starImg = loadImage("star.png");
	rocketImg = loadImage("rocket.png");
	asteroid1Img = loadImage("asteroid.png");
	laserImg = loadImage("laser.png");
	spaceImg = loadImage("world.jpg");
	blastImg = loadImage("blast.png");
	fuelImg = loadImage("fuel.png");
	alienImg = loadImage("alien.png");
	gameOverImg = loadImage("r.png");


	explosionSound = loadSound("preview.mp3");

}

function setup() {

	createCanvas(windowWidth, windowHeight);

	space = createSprite(width/2, height/2);
	space.addImage(spaceImg);
	space.scale = 1.5;
	space.y = 200;
	space.velocityY = 1;

	rocket = createSprite(width/2, height/2);
	rocket.addImage(rocketImg);
	rocket.scale = 0.3;

	laser = createSprite(width/2, height-50);
	laser.velocityX = 70;
	laser.addImage(laserImg);
	laser.setCollider("rectangle", 0, 0, 400, 80);

	gameOver = createSprite(width/2, height/2);
	gameOver.addImage(gameOverImg);
	gameOver.scale = 0.5;
	gameOver.visible = false;


	asteroid1Group = new Group();
	starGroup = new Group();
	fuelGroup = new Group();
	alienGroup = new Group();

}

function draw() {

	background(0);

	edges = createEdgeSprites();
	rocket.collide(edges);
	laser.bounceOff(edges);


	if (gameState === "play") {

		fuelCount = fuelCount - Math.round(getFrameRate() / 60);
		distance = distance + Math.round(getFrameRate() / 60);

		if (keyDown("left_arrow")) {
			rocket.x = rocket.x - 3;
		}

		if (keyDown("right_arrow")) {
			rocket.x = rocket.x + 3;
		}

		if (keyDown("space")) {
			rocket.velocityY = -10;
		}

		rocket.velocityY = rocket.velocityY + 0.8;
      
		if (space.y > height-200) {
			space.y = height/2;
		}
		space.velocityY = (4 + 3 * distance / 100);
      
		if (asteroid1Group.isTouching(rocket) || rocket.isTouching(laser)) {
          
			rocket.addImage(blastImg);
			explosionSound.play();
			rocket.velocityY = 0;
			space.velocityY = 0;
			laser.velocityX = 0;
			starGroup.destroyEach();
			asteroid1Group.destroyEach();
			alienGroup.destroyEach();
			fuelGroup.destroyEach();

			explosionSound.play();
			gameState = "end";
		}

		if (fuelCount < 50) {
			text("Low Feul", width-100, height-350);
		}
		if (fuelCount === 0) {
			rocket.velocityY = 10;
			fuelCount = 1;
		}
		if (starGroup.isTouching(rocket)) {
			starGroup.destroyEach();
			starCount = starCount + 1;
		}
		createStars();
		createAsteroid1();
		createFuel();
		createAlien();
		// createAsteroid2();

		if (fuelGroup.isTouching(rocket)) {
			fuelGroup.destroyEach();
			fuelCount = 500;
		}

		if (alienGroup.isTouching(rocket)) {
			starCount = 0;
			alienGroup.destroyEach();
		}
	}

	if (gameState === "end") {
		gameOver.visible = true;
	}

	if (keyDown("r") && gameState === "end") {
		reset();
	}

	drawSprites();


	textSize(15);
	fill("yellow");
	text("Stars: " + starCount, width-150, height-550);

	fill("green");
	text("Fuel: " + fuelCount, width-150, height-500);

	fill("blue");
	text("Distance: " + distance, width-150, height-450);

	fill("blue");
	text("km", width-20, height-450);


}


function createStars() {
  
	if (World.frameCount % 200 == 0) {
		star = createSprite(Math.round(random(width-550, height-250), height-500, 10, 10));
		star.addImage(starImg);
		star.velocityY = (3 + distance / 100);
		star.scale = 0.1;
		star.velocityY = 3;
		star.lifetime = 200;
		starGroup.add(star);
	}
}

function createAsteroid1() {
	if (World.frameCount % 400 == 0) {
		asteroid1 = createSprite(Math.round(random(0, 200)), Math.round(random(0, 200), 10, 10));
		asteroid1.addImage(asteroid1Img);
		asteroid1.velocityY = (5 + distance / 100);
		asteroid1.scale = 0.1;
		asteroid1.velocityY = 5;
		asteroid1.lifetime = 120;
		asteroid1Group.add(asteroid1);
	}
}


function createFuel() {
	if (World.frameCount % 300 == 0) {
		fuel = createSprite(Math.round(random(50, 300), 100, 10, 10));
		fuel.addImage(fuelImg);
		fuel.velocityY = (5 + distance / 100);
		fuel.scale = 0.1;
		fuel.velocityY = 5;
		fuel.lifetime = 120;
		fuelGroup.add(fuel);
	}
}

function createAlien() {
	if (World.frameCount % 500 == 0) {
		alien = createSprite(Math.round(random(50, 300), 100, 10, 10));
		alien.velocityY = (5 + distance / 100);
		alien.addImage(alienImg);
		alien.scale = 0.1;
		alien.velocityY = 6;
		alien.lifetime = 120;
		alienGroup.add(alien);
	}
}

function reset() {

	gameState = "play";
	alienGroup.destroyEach();
	fuelGroup.destroyEach();
	asteroid1Group.destroyEach();
	starGroup.destroyEach();

	rocket.addImage(rocketImg);
	rocket.x = 200;
	rocket.y = 200;

	laser.velocityX = 10;

	starCount = 0;
	fuelCount = 500;
	distance = 0;

	gameOver.visible = false;
}