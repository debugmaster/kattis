import * as Readline from 'readline';

let numberOfSamples: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!numberOfSamples) {
        numberOfSamples = parseInt(input);
        return;
    }

    const [beats, timePeriod] = input.split(' ').map((s) => parseFloat(s));
    const timeFactor = 60 / timePeriod;
    const calculated = beats * timeFactor;
    const mininum = (beats - 1) * timeFactor;
    const maximum = (beats + 1) * timeFactor;
    console.log(
        mininum.toFixed(4),
        calculated.toFixed(4),
        maximum.toFixed(4)
    );
});
