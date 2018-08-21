import * as Readline from 'readline';

let numberOfAddends: number;
let sum: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {

    if (!numberOfAddends) {
        numberOfAddends = parseInt(input);
        sum = 0;
        return;
    }

    let base = parseInt(input.substring(0, input.length - 1));
    let power = parseInt(input.substring(input.length - 1));

    sum += Math.pow(base, power);

    if (!--numberOfAddends) {
        console.log(sum);
    }
});
