import * as Readline from 'readline';

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    let [r1, s] = input.split(" ").map(s => parseInt(s));
    console.log(2*s - r1);
});
