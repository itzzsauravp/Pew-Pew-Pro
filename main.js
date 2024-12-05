const CanvasStart = () => {
  const canvas = document.getElementById("game_canvas");
  const gameStartButton = document.getElementById("game_start_btn");
  const gameEndButton = document.getElementById("game_end_btn");
  const hitCount = document.querySelector(".hit_count");
  const missCount = document.querySelector(".miss_count");

  let totalClick = 0;
  let hit = 0;
  let miss = 0;
  let xCord_bubble, yCord_bubble;
  let gameInterval;

  const canvasWidth = 1200;
  const canvasHeight = 900;
  const bubbleRadius = 50;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  const ctx = canvas.getContext("2d");

  const getBubblePlaceCoordinates = () => {
    const xLimit = canvasWidth - bubbleRadius;
    const yLimit = canvasHeight - bubbleRadius;
    const xCord = Math.floor(
      Math.random() * (xLimit - bubbleRadius) + bubbleRadius
    );
    const yCord = Math.floor(
      Math.random() * (yLimit - bubbleRadius) + bubbleRadius
    );
    return [xCord, yCord];
  };

  const drawBubble = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.beginPath();
    ctx.arc(xCord_bubble, yCord_bubble, bubbleRadius, 0, Math.PI * 2, true);
    ctx.fillStyle = "#5277F1";
    ctx.fill();
    ctx.closePath();
  };

  canvas.addEventListener("click", (event) => {
    totalClick += 1;
    const rect = canvas.getBoundingClientRect();
    const xCord_mouse = event.clientX - rect.left;
    const yCord_mouse = event.clientY - rect.top;

    const distance = Math.sqrt(
      Math.pow(xCord_bubble - xCord_mouse, 2) +
        Math.pow(yCord_bubble - yCord_mouse, 2)
    );

    if (distance <= bubbleRadius) {
      hit += 1;
      hitCount.textContent = hit;

      [xCord_bubble, yCord_bubble] = getBubblePlaceCoordinates();
      drawBubble();
    } else {
      miss += 1;
      missCount.textContent = miss;
    }
  });

  const runGame = () => {
    hit = 0;
    hitCount.textContent = hit;
    [xCord_bubble, yCord_bubble] = getBubblePlaceCoordinates();
    drawBubble();

    gameInterval = setInterval(() => {
      [xCord_bubble, yCord_bubble] = getBubblePlaceCoordinates();
      drawBubble();
    }, 1000);

    gameStartButton.style.display = "none";
    gameEndButton.style.display = "inline";
  };

  const stopGame = () => {
    clearInterval(gameInterval);
    alert(`Great You were ${((hit / totalClick) * 100).toFixed(2)}% accurate`);
    gameStartButton.style.display = "inline";
    gameEndButton.style.display = "none";
    window.location.reload();

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  };

  gameStartButton.addEventListener("click", runGame);
  gameEndButton.addEventListener("click", stopGame);

  gameEndButton.style.display = "none";
};

window.addEventListener("load", CanvasStart);
