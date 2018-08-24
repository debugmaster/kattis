import * as Readline from 'readline';

let R: number;
let S: number;
let K: number;

let picture = [] as boolean[][];

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!R) {
        [R, S, K] = input.split(' ').map((s) => parseInt(s));
        return;
    }

    let currentLine = picture.length;
    picture[currentLine] = [];

    input.split('').forEach(function (value, index) {
        if (value === '*') {
            picture[currentLine][index] = true;
        }
    });

    // If the picture has R rows, it means all rows have been inserted
    if (picture.length === R) {
        findAndPrintBestShot(picture, R, S, K);
        // Reset to next run
        R = S = K = 0;
        picture = [];
        return;
    }
});

function findAndPrintBestShot(picture: boolean[][], width: number, height: number, size: number): void {
    let max = 0, posX = 0, posY = 0;
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let newMax = computeShot(picture, x, y, size);
            if (newMax > max) {
                max = newMax;
                posX = x;
                posY = y;
            }
        }
    }

    console.log(max);
    printShot(picture, posX, posY, width, height, size);
}

function computeShot(picture: boolean[][], x: number, y: number, size: number): number {
    let killed = 0;
    for (let i = x + 1; i < x + size - 1; i++) {
        for (let j = y + 1; j < y + size - 1; j++) {
            if (picture[i] && picture[i][j]) {
                killed++;
            }
        }
    }
    return killed;
}

function printShot(
    picture: boolean[][],
    x: number,
    y: number,
    width: number,
    height: number,
    size: number
): void {
    // Fixing index;
    size = size - 1;
    for (let i = 0; i < width; i++) {
        let row = '';
        for (let j = 0; j < height; j++) {
            if (
                (i === x && j === y) ||
                (i === x + size && j === y) ||
                (i === x && j === y + size) ||
                (i === x + size && j === y + size)
            ){
                row += '+';
            } else if (
                (i === x || i === x + size) &&
                (y <= j && j <= y + size)
            ){
                row += '-';
            } else if (
                (j === y || j === y + size) &&
                (x <= i && i <= x + size)
            ){
                row += '|';
            } else if (picture[i] && picture[i][j]) {
                row += '*';
            } else {
                row += '.';
            }
        }
        console.log(row);
    }
}
