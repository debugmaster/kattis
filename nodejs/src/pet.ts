import * as Readline from 'readline';

let currentPlayer = 1;
let currentSum = 0;
let currentWinner = 0;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    let sum = input.split(' ').map((s) => parseInt(s)).reduce((p, c) => p + c, 0);
    if (sum > currentSum) {
        currentWinner = currentPlayer;
        currentSum = sum;
    }

    if (++currentPlayer > 5) {
        console.log(currentWinner, currentSum);
        currentSum = currentWinner = 0;
        currentPlayer = 1;
    }
});
