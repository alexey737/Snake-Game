const body = document.body;
const canvas = document.querySelector('.snake-game');
const ctx = canvas.getContext('2d');

const fieldImage = new Image();
const foodImage = new Image();
fieldImage.src = 'img/ground.png';
foodImage.src = 'img/food.png';

let game;
const sizeBox = 32;
const boxCountX = 17;
const boxCountY = 15;
let score = '0';

let food = {
    x: Math.floor((Math.random() * boxCountX + 1)) * sizeBox,
    y: Math.floor((Math.random() * boxCountY + 3)) * sizeBox
}

let snake = [];
snake[0] = {
    x: sizeBox * 9,
    y: sizeBox * 10
}

let direction;

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 38 && direction !== 'down') {
        direction = 'up';
    } else if (event.keyCode === 40 && direction !== 'up') {
        direction = 'down';
    } else if (event.keyCode === 37 && direction !== 'right') {
        direction = 'left';
    } else if (event.keyCode === 39 && direction !== 'left') {
        direction = 'right';
    }
});

const eatFood = () => {
    score++;
    food = {
        x: Math.floor((Math.random() * boxCountX + 1)) * sizeBox,
        y: Math.floor((Math.random() * boxCountY + 3)) * sizeBox
    }
}

const eatTail = (head, snake) => {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            stopGame();
        }
    }
}

const drawGame = () => {
    ctx.drawImage(fieldImage, 0, 0);
    ctx.drawImage(foodImage, food.x, food.y);


    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#EF0606FF' : '#278801FF';
        ctx.fillRect(snake[i].x, snake[i].y, sizeBox, sizeBox);
    }

    ctx.fillStyle = '#fff';
    ctx.font = '40px sans-serif'
    ctx.fillText(score, 80, 50);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'up') {
        snakeY -= sizeBox;
    } else if (direction === 'down') {
        snakeY += sizeBox;
    } else if (direction === 'left') {
        snakeX -= sizeBox;
    } else if (direction === 'right') {
        snakeX += sizeBox;
    }


    if (snakeY === 64 || snakeY === 576 || snakeX === 576 || snakeX === 0) {
        stopGame();
    }

    if (snake[0].x === food.x && snake[0].y === food.y) {
        eatFood()
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    eatTail(newHead, snake);
}

const startGame = () => {
    game = setInterval(drawGame, 80);
}

const stopGame = () => {
    clearInterval(game);

    const restartContent =
        `<div class="restart-game__text">game over</div>
         <div class="restart-game__button">restart</div>`;

    const restart = document.createElement('div');

    restart.classList.add('restart-game');
    restart.innerHTML = restartContent;

    setTimeout(() => {
        ctx.clearRect(0, 0, 608, 607);
        body.insertBefore(restart, canvas);
    }, 300);

    restart.addEventListener('click', (event) => {
       const targetItem = event.target;
       if (targetItem.closest('.restart-game__button')) {
           restart.remove();
           score = '0';
           snake = [];
           snake[0] = {
               x: sizeBox * 9,
               y: sizeBox * 10
           }
           direction = undefined;
           food = {
               x: Math.floor((Math.random() * boxCountX + 1)) * sizeBox,
               y: Math.floor((Math.random() * boxCountY + 3)) * sizeBox
           }
           startGame();
       }
    });
}

startGame();