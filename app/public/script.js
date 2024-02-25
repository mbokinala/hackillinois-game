/** dimensions of tiles */
const WIDTH = 100;
const HEIGHT = 150;

const WINNING_SCORE = 124;

var time; // countdown
var score; // number of tiles clicked correctly

var playing; // determine state
var won; // whether the WINNING_SCORE was reached or not
var index_music = 0;
var index_position = 0;

/*
 *  -1 = red
 *   0 = black
 *   1 = white
 */
var tiles = []; // holds field
function preload() {
  soundFormats('mp3', 'ogg');
  soundA = loadSound('a4.mp3');
  soundAs = loadSound('a-4.mp3');
  soundB = loadSound('b4.mp3');
  soundC = loadSound('c4.mp3');
  soundCs = loadSound('c-4.mp3');
  soundD = loadSound('d4.mp3');
  soundDs = loadSound('d-4.mp3');
  soundE = loadSound('e4.mp3');
  soundF = loadSound('f4.mp3');
  soundFs = loadSound('f-4.mp3');
  soundG = loadSound('g4.mp3');
  soundGs = loadSound('g-4.mp3');
  soundA1 = loadSound('a3.mp3');
  soundAs1 = loadSound('a-3.mp3');
  soundB1 = loadSound('b3.mp3');
  soundC1 = loadSound('c3.mp3');
  soundCs1 = loadSound('c-3.mp3');
  soundD1 = loadSound('d3.mp3');
  soundDs1 = loadSound('d-3.mp3');
  soundE1 = loadSound('e3.mp3');
  soundF1 = loadSound('f3.mp3');
  soundFs1 = loadSound('f-3.mp3');
  soundG1 = loadSound('g3.mp3');
  soundGs1 = loadSound('g-3.mp3');
  sounds = [soundA, soundAs, soundB, soundC, soundCs, soundD, soundDs, soundE, soundF, soundFs, soundG, soundGs,
    soundA1, soundAs1, soundB1, soundC1, soundCs1, soundD1, soundDs1, soundE1, soundF1, soundFs1, soundG1, soundGs1];
  song = [7, 6, 7, 6, 7, 2, 5, 3, 0, 15, 19, 0, 2, 19, 23, 2, 3, 19, 7, 6, 7, 6, 7, 2, 5, 3, 0, 15, 19, 0, 2, 17, 3, 2, 0,
    7, 6, 7, 6, 7, 2, 5, 3, 0, 15, 19, 0, 2, 19, 23, 2, 3, 19, 7, 6, 7, 6, 7, 2, 5, 3, 0, 15, 19, 0, 2, 17, 3, 2, 0,
    2, 3, 5, 7, 22, 8, 7, 5, 20, 7, 5, 3, 19, 5, 3, 2, 19, 7, 6, 7, 6,
    7, 2, 5, 3, 0, 15, 19, 0, 2, 19, 23, 2, 3, 19, 7, 6, 7, 6, 7, 2, 5, 3, 0, 15, 19, 0, 2];
  position = [0, 1, 0, 1, 0, 2, 3, 0, 1, 3, 2, 1, 0, 3, 1, 3, 1, 2, 0, 2, 3, 2, 3, 0, 1, 2, 1, 3, 1, 0, 2, 1, 3, 0, 1, 2, 2, 0, 1, 1, 2, 3, 2, 3, 0, 2, 1, 3, 2,
    0, 1, 2, 2, 1, 0, 3, 2, 2, 0, 3, 1, 2, 3, 3, 2, 0, 1, 0, 1, 2, 3, 3, 3, 2, 3, 0, 2, 1, 3, 2, 3, 2, 0, 2, 1, 3, 2, 0, 1, 3, 2, 0, 1, 2, 1, 0, 1, 3, 2, 0, 3, 0, 1,
    2, 0, 3, 2, 3, 1, 2, 0, 1, 1, 3, 2, 3, 2, 1, 0, 2, 1, 2, 0, 1];
}
function setup() {
  createCanvas(401, 601); // keep borders (1 pixel padding)


  time = -3; // countdown begins at three
  score = 0;

  /* initializing first rows */
  for (var i = 0; i < 4; i++) {
    newRow();
  }

  playing = false;
  won = false;
  textAlign(CENTER);
}

function draw() {
  background(51);

  drawTiles();

  handleState();
}

/**
 * draws all tiles
 */
function drawTiles() {

  for (var i = 0; i < tiles.length; i++) {

    var x = (i % 4) * WIDTH;
    var y = (Math.floor(i / 4) * HEIGHT);

    /*
     *  -1 = red
     *   0 = black
     *   1 = white
     */
    fill((tiles[i] !== 0) ? ((tiles[i] === 1) ? "#FFFFFF" : "#FF0000") : "#000000");
    rect(x, y, WIDTH, HEIGHT);
  }
}

/**
 * draws correct screens depending on the state of the game
 */
function handleState() {

  if (!playing) { // if we are not playing

    if (time > 0) { // if we are not in the countdown
      /* endGame */

      drawEnd(won);
    } else { // pre-game

      /* draw countdown */
      textSize(60);
      fill("#FF0000");
      text(-time, width / 2, height / 2);

      /* count down countdown */
      if (frameCount % 60 === 0) {

        time++;
        if (time === 0) {
          playing = true;
        }
      }
    }
  } else { // still playing

    /* draw time */
    textSize(90);
    fill("#FFFF00");
    text(getTime(), width / 2, HEIGHT);
    time++;
  }
}

/**
 * based upon won, this will draw a "complete" message, or a "you lose" message
 */
function drawEnd(won) {

  if (won) {

    background("#66EE66");

    fill("#FFFFFF");
    textSize(60);
    text("Complete!", width / 2, height / 2 - 80);

    fill("#000000");
    textSize(70);
    text(getTime(), width / 2, height / 2);

    fill("#FFFFFF");
    textSize(40);
    text("Press f5 to restart!", width / 2, height / 2 + 50);

  } else {

    fill("#FF00FF");
    textSize(60);
    text("Game Over!", width / 2, height / 2);
    textSize(40);
    text("Press f5 to restart!", width / 2, height / 2 + 50);
  }
}

/**
 * handling user input
 */
function mousePressed() {

  if (!playing) // don't allow input if the player isn't playing
    return;

  if (mouseY >= 3 * HEIGHT && mouseY <= 4 * HEIGHT) {
    // check if click is within canvas bounds

    var tile = getClickedTile(mouseX, mouseY);


    var clickedTilePos = Math.floor(mouseX / WIDTH);

    parent.window.clickButton(clickedTilePos);

    if (tile == -1) // they clicked out of bounds
      return;

    if (tiles[tile] !== 0) {
      /* end game */

      tiles[tile] = -1;

      won = false;
      playing = false;
    } else {
      score++;
      newRow();
      //delay = new p5.Delay();
      //sound.connect(delay);
      if (index_music == song.length) {
        index_music = 0;
      }
      sounds[song[index_music]].play();
      index_music++;
      if (score >= WINNING_SCORE) {
        /* end game */

        won = true;
        playing = false;
      }
    }
  }

}

/**
 * returns index of clicked tile
 * only returns bottom row tiles
 */
function getClickedTile(mX) {

  for (var i = 0; i < 4; i++) {

    var lowerBound = i * WIDTH;
    var upperBound = (i + 1) * WIDTH;
    if (mX >= lowerBound && mX <= upperBound) {
      return i + 12; // only return for bottom row, which is 3 rows of 4 deep in the array
    }
  }

  return -1; // click was out of bounds
}

/**
 * push a new row
 */
function newRow() {

  var column = position[index_position];
  index_position++;

  for (var i = 0; i < 4; i++) {

    tiles.unshift((column === i) ? 0 : 1); // push tiles to the front, A.K.A. top
  }

}

/**
 * returns formatted time, e.g.: "12.345\""
 */
function getTime() {
  return Math.floor(time / 60) + "." + Math.floor(map(time % 60, 0, 59, 0, 999)) + "\"";
}