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

    console.log(`${number} is ${number % 2 ? 'odd' : 'even'}`);
});