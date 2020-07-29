var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 5;
var ballSpeedY = 5;
var ballSize = 10;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 12;

const calculateMousePosition = (e) => {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = e.clientX - rect.left - root.scrollLeft;
  var mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
};

const handleMouseClick = () => {
  if (showingWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showingWinScreen = false;
  }
};

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  var framesPerSecond = 60;

  setInterval(() => {
    moveEverything();
    drawEverything();
  }, 1000 / framesPerSecond);

  canvas.addEventListener('mousedown', handleMouseClick);
  canvas.addEventListener('mousemove', (e) => {
    var mousePos = calculateMousePosition(e);
    // align paddle to the middle of mouse cursor
    paddle2Y = mousePos.y - PADDLE_HEIGHT / 2;
  });
};

const ballReset = () => {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showingWinScreen = true;
  }

  ballSpeedX = -ballSpeedX;
  // center
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
};

const computerMovement = () => {
  var paddle1YCenter = paddle1Y + PADDLE_HEIGHT / 2;

  if (paddle1YCenter < ballY - 35) {
    paddle1Y += 6;
  } else if (paddle1YCenter > ballY + 35) {
    paddle1Y -= 6;
  }
};

const moveEverything = () => {
  if (showingWinScreen) return;

  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;
  // bounce
  if (ballX < 10) {
    // below the paddle and above top of the paddle
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.25;
    } else {
      player2Score++; //must be before ballReset
      ballReset();
    }
  }
  // bounce
  if (ballX > canvas.width - ballSize) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.25;
    } else {
      player1Score++;
      ballReset();
    }
  }

  if (ballY < ballSize) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballY > canvas.height - ballSize) {
    ballSpeedY = -ballSpeedY;
  }
};
const drawNet = () => {
  for (var i = 0; i < canvas.height; i += 40) {
    colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
  }
};
const drawEverything = () => {
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  if (showingWinScreen) {
    canvasContext.fillStyle = 'white';

    if (player1Score >= WINNING_SCORE) {
      canvasContext.fillText('Player One won!', 400, 100);
    } else if (player2Score >= WINNING_SCORE) {
      canvasContext.fillText('Player Two won!', 400, 100);
    }

    canvasContext.fillText('click to continue', 400, 400);
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, 700, 100);
    return;
  }

  drawNet();

  //left pedal
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'blue');

  //computer pedal
  colorRect(
    canvas.width - PADDLE_THICKNESS,
    paddle2Y,
    PADDLE_THICKNESS,
    PADDLE_HEIGHT,
    'blue'
  );

  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, 700, 100);

  colorCircle(ballX, ballY, ballSize, 'red');
};

const colorCircle = (centerX, centerY, radius, color) => {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
};
const colorRect = (leftX, topY, width, height, drawColor) => {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
};
