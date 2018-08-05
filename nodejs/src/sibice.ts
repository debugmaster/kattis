import * as Readline from 'readline';

let N: number;
let W: number;
let H: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!N) {
        [N,W,H] = input.split(' ').map((s) => parseInt(s));
        return;
    }

    let matchSize = parseInt(input);
    // It needs to fit horizontally, vertically, or diagonally
    if (matchSize <= W || matchSize <= H || (matchSize * matchSize <= W*W + H*H)) {
        console.log('DA');
    } else {
        console.log('NE');
    }

    // Decrease the number of matches to know when N, W, and H will be reset.
    N--;
});
