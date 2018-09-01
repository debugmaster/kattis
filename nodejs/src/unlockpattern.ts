import * as Readline from 'readline';

interface Indexes {
    [id: number]: [number, number]
}

let currentRow = 0;
let indexes = {} as Indexes;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    input.split(' ').forEach((pivot, index) => {
        indexes[parseInt(pivot)] = [currentRow, index];
    });

    if (++currentRow === 3) {
        let sum = 0;
        for (let i = 1; i < 9; i++) {
            let deltaX = indexes[i][0] - indexes[i+1][0];
            let deltaY = indexes[i][1] - indexes[i+1][1];
            if (deltaX && deltaY) {
                sum += Math.sqrt(deltaX*deltaX + deltaY*deltaY);
            } else {
                // Replacing deltaX or deltaY to 0 in the previous
                // statement will result in the absolute value of
                // the non-zero value.
                sum += Math.abs(deltaX + deltaY);
            }
        }
        console.log(sum.toFixed(10));
    }
});
