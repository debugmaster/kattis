import * as Readline from 'readline';

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    let [articles, factor] = input.split(" ").map(s => parseInt(s));
    // As factor is always rounded upwards,
    // you need to add 1 scientist to the factor (factor - 1)
    console.log(articles * --factor + 1);
});
