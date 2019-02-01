import * as Readline from 'readline';

let periods: number;
let sum: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {

    if (!periods) {
        periods = parseInt(input);
        sum = 0;
        return;
    }

    let [quality, years] = input.split(" ").map((s) => parseFloat(s));;
    sum += quality * years;

    if (!--periods) {
        console.log(sum.toFixed(3));
    }
});