import * as Readline from 'readline';

let X: number;
let Y: number;
let N: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    [X, Y, N] = input.split(' ').map((s) => parseInt(s));
    let i = X, j = Y;
    let current = 1;

    while ( i <= N || j <= N ) {
        let min = Math.min(i, j);
        while (current < min) {
            console.log(current++);
        }
        current = min + 1;

        if (i == j) {
            console.log('FizzBuzz');
            i += X;
            j += Y;
        } else if (i < j) {
            console.log('Fizz');
            i += X;
        } else /* i > j */ {
            console.log('Buzz');
            j += Y;
        }
    }

    while (current <= N) {
        console.log(current++);
    }
});
