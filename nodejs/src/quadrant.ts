import * as Readline from 'readline';

let x: number;
let y: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!x) {
        x = parseInt(input);
    } else if (!y) {
        y = parseInt(input);

        let q: 1 | 2 | 3 | 4 | undefined;
        if (x > 0) {
            if (y > 0) {
                q = 1;
            } else if (y < 0) {
                q = 4;
            }
        } else if (x < 0) {
            if (y > 0) {
                q = 2;
            } else if (y < 0) {
                q = 3;
            }
        }

        if (q) {
            console.log(q);
        }
        x = y = 0;
    }
});
