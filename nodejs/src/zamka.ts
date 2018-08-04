import * as Readline from 'readline';

let L: number;
let D: number;
let X: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!L) {
        L = parseInt(input);
    } else if (!D) {
        D = parseInt(input);
    } else {
        X = parseInt(input);

        for (let i = L; i <= D; i++) {
            if (countSumOfDigits(i) === X) {
                console.log(i);
                break;
            }
        }
        for (let i = D; i >= L; i--) {
            if (countSumOfDigits(i) === X) {
                console.log(i);
                break;
            }
        }

        L = D = X = 0;
    }
});

function countSumOfDigits(x: number): number {
    return x.toString().split('').reduce<number>((prev: number, curr: string) => {
        return prev += parseInt(curr);
    }, 0);
}
