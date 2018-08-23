import * as Readline from 'readline';

let contestants = 0;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (contestants === 0) {
        let problems: number;
        [contestants, problems] = input.split(" ").map(s => parseInt(s));
        console.log(problems);
        return;
    }

    contestants--;
});
