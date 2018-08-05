import * as Readline from 'readline';

let numberOfMatches: number;
let boxWidth: number;
let boxSize: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!numberOfMatches) {
        [numberOfMatches, boxWidth, boxSize] = input.split(' ').map((s) => parseInt(s));
        return;
    }

    let matchSize = parseInt(input);
    // It needs to fit horizontally, vertically, or diagonally
    if (matchSize <= boxWidth || matchSize <= boxSize || (matchSize * matchSize <= boxWidth*boxWidth + boxSize*boxSize)) {
        console.log('DA');
    } else {
        console.log('NE');
    }

    // Decrease the number of matches to know when variables will be reset.
    numberOfMatches--;
});
