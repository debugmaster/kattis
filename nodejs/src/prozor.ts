import * as Readline from 'readline';

let R: number;
let S: number;
let K: number;
let picture: boolean[][];

/**
 * Store maximum number of flies and coordinates from racket
 * into global variables because they are computed while
 * data is still being received
 */
let max: number;
let posX: number;
let posY: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!R) {
        [R, S, K] = input.split(' ').map((s) => parseInt(s));
        picture = [];
        max = posX = posY = -1;
        return;
    }

    let currentLine = picture.length;
    picture[currentLine] = [];

    input.split('').forEach(function (value, index) {
        if (value === '*') {
            picture[currentLine][index] = true;
        }
        if (index >= K - 1 && currentLine >= K - 1) {
            findAndPrintBestShot(picture, K, currentLine - K + 1, index - K + 1);
        }
    });

    // If the picture has R rows, it means all rows have been inserted
    if (picture.length === R) {
        console.log(max);
        printShot(picture, posX, posY, R, S, K);
        // Reset to next run
        R = S = K = 0;
        return;
    }
});

function findAndPrintBestShot(
    picture: boolean[][],
    size: number,
    startX: number,
    startY: number
): void {
    let newMax = computeShot(picture, startX, startY, size);
    if (newMax > max) {
        max = newMax;
        posX = startX;
        posY = startY;
    }
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
            let p1 = i === x;
            let p2 = j === y;
            let p3 = i === x + size;
            let p4 = j === y + size;
            if (
                (p1 && p2) ||
                (p3 && p2) ||
                (p1 && p4) ||
                (p3 && p4)
            ){
                row += '+';
            } else if (
                (p1 || p3) &&
                (y <= j && j <= y + size)
            ){
                row += '-';
            } else if (
                (p2 || p4) &&
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
