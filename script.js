const map = document.getElementById('map');
const snake = document.getElementById('snake');

// Snake object constructor.
// function Snake() {
//     this.x = 150;
//     this.y = 150;
// }

function changeSnakeColor() {
    console.log('Changing snake color...')
    if (snake.style.fill == 'white') {
        snake.style.fill = 'gold';
    } else {
        snake.style.fill = 'white';
    }
    console.log(`Snake is now ${snake.style.fill}.`);
}

// Food class.
class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
// Making food object from initial circle (in HTML).
const initFood = new Food(150, 100);

let foods = [initFood];
let i = 1;

function addFood() {
    let food = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    food.style.fill = 'white';

    // Position should be b/w 10-290, in multiples of 10.
    // So, 1-29 * 10. Used MDN to help.
    food.style.cx = `${Math.floor(Math.random() * (29) + 1) * 10}`;
    food.style.cy = `${Math.floor(Math.random() * (29) + 1) * 10}`;
    food.style.r = '5';

    map.appendChild(food);
    console.log(`Dropped food at ${food.style.cx}, ${food.style.cy}.`);

    // Adding food as object w/ position properties to array.
    let newFood = new Food(food.style.cx, food.style.cy);
    foods[i] = newFood;
    i++;
}

function moveSnake(dir) {
    let snakeXPos = parseInt(snake.style.x);
    let snakeYPos = parseInt(snake.style.y);

    if (snakeXPos == 5 && dir == 'ArrowLeft') {
        console.log('Snake has hit the left wall.');
        return;
    } else if (snakeXPos == 285 && dir == 'ArrowRight') {
        console.log('Snake has hit the right wall.');
        return;
    } else if (snakeYPos == 5 && dir == 'ArrowUp') {
        console.log('Snake has hit the top wall.');
        return;
    } else if (snakeYPos == 285 && dir == 'ArrowDown') {
        console.log('Snake has hit the bottom wall.');
        return;
    }

    switch (dir) {
        case 'ArrowRight': 
            snakeXPos += 10;
            break;
        case 'ArrowLeft':
            snakeXPos -= 10;
            break;
        case 'ArrowUp':
            snakeYPos -= 10;
            break;
        case 'ArrowDown':
            snakeYPos += 10;
            break;
        default:
            console.log('Snake did not move.');
    }

    snake.style.x = snakeXPos;
    snake.style.y = snakeYPos;

    // console.log(`Snake moved to ${snakeXPos}, ${snakeYPos}`)

    // Checking if snake eats food...
    for (food of foods) {
        // console.log(`Food at ${food.x}, ${food.y}`)
        if (snakeXPos + 5 == food.x && snakeYPos + 5 == food.y) {
            console.log('Snake ate the food!');
            
        }
    }
}   

document.addEventListener('keydown', (ev) => {
     moveSnake(ev.key);
});