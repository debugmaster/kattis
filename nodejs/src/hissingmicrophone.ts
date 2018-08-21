import * as Readline from 'readline';

const PATTERN = 'ss';
const HISS = 'hiss';
const NO_HISS = 'no ' + HISS;
Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    console.log(input.includes(PATTERN) ? HISS : NO_HISS );
});
