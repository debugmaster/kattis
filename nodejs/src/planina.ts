import * as Readline from 'readline';

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    let nrOfIterations = parseInt(input);
    nrOfIterations = 1 + Math.pow(2, nrOfIterations);
    console.log( nrOfIterations * nrOfIterations )
});
