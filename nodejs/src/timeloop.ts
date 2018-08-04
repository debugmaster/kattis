import * as Readline from 'readline';

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    let nrSpells = parseInt(input);
    for (let i = 1; i <= nrSpells; i++) {
        console.log(i + ' Abracadabra');
    }
});
