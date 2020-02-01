const CANVAS_NAME = "canvas";

console.log("yeah game is loaded");

var gameCanvas = document.getElementById(CANVAS_NAME);
var gameCtx = gameCanvas.getContext("2d");

var koalaImg = new Image();
koalaImg.src = "js/assets/koala1.png";

var basketImg = new Image();
basketImg.src = "js/assets/koala2.png";

var leftPressed = false;
var rightPressed = false;

var seconds = 0;
var koalaSaved = 0;

var basket = {
  height: basketImg.height,
  width: basketImg.width,
  x: gameCanvas.width / 2,
  y: gameCanvas.height - 100,
  dx: 6
};

var koalas = [];

/**
 * Creates koalas at random places
 */
function createBaseKoala() {
  seconds++;
  koalas[koalas.length] = {
    x: Math.random() * (gameCanvas.width - koalaImg.width),
    y: -koalaImg.height,
    dy: Math.random() * 3 + 1 //randomizing speed
  };
}

/**
 * Draws a koala and checks collisions
 */
function drawKoala() {
  for (let i = 0; i < koalas.length; i++) {
    gameCtx.drawImage(koalaImg, koalas[i].x, koalas[i].y);
    if (
      koalas[i].y > basket.y - koalaImg.height &&
      ((koalas[i].x > basket.x && koalas[i].x < basket.x + basketImg.width) ||
        (koalas[i].x + koalaImg.width > basket.x &&
          koalas[i].x + koalaImg.width < basket.x + basketImg.width))
    ) {
      koalas.splice(i, 1);
      koalaSaved++;
      console.log(koalaSaved);
    } else if (koalas[i].y + koalas[i].dy > gameCanvas.height) {
      koalas.splice(i, 1); //removes koala once it reaches the ground
    } else {
      koalas[i].y += koalas[i].dy;
    }
  }
}

/**
 * Draws basket and moves it with key presses
 */
function drawBasket() {
  basket.height = basketImg.height;
  gameCtx.drawImage(basketImg, basket.x, basket.y);
  console.log(basket.x + " " + basket.y);
  if (rightPressed && basket.x + basketImg.width < gameCanvas.width) {
    basket.x += basket.dx;
  }
  if (leftPressed && basket.x > 0) {
    basket.x -= basket.dx;
  }
}

/**
 * Main draw function, draws all the elements in the canvas
 */
function draw() {
  gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  drawKoala();
  drawBasket();
}

//Adding event listeners for keys
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/**
 * Key handlers for movement
 */
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

var drawInterval = setInterval(draw, 10);
var koalaInterval = setInterval(createBaseKoala, 1000);