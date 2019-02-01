import * as Readline from 'readline';

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    console.log(
        input.split(" ")
            .map(s => s.split("").reverse().join(""))
            .map(s => parseInt(s))
            .reduce((a, b) => Math.max(a,b))          
    );
});
