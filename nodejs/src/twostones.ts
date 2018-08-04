import * as Readline from 'readline';

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    let stones = parseInt(input);
    if (stones % 2 === 0) {
        console.log('Bob');
    } else {
        console.log('Alice');
    }
});
