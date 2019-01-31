import * as Readline from 'readline';

let testCases: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {

    if (!testCases) {
        testCases = parseInt(input);
        return;
    }

    let number = parseInt(input);
    if (!number) {
        console.log(0);
        return;
    }

    // Starts with 1 because 1 x A = A
    let lastDigit = 1;
    while (number) {
        lastDigit = (lastDigit * number--) % 10;
    }

    console.log(lastDigit);
});
