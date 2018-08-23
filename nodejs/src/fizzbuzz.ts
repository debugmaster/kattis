import * as Readline from 'readline';

let X: number;
let Y: number;
let N: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    [X, Y, N] = input.split(' ').map((s) => parseInt(s));
    for (let i = 1; i <= N; i++) {
        let divisibleByX = i % X === 0;
        let divisibleByY = i % Y === 0;
        if (divisibleByX && divisibleByY) {
            console.log('FizzBuzz');
        } else if (divisibleByX) {
            console.log('Fizz');
        } else if (divisibleByY) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
});
