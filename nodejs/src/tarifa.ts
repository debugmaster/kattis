import * as Readline from 'readline';

type Megabytes = number;
type Months = number;

let myPlan: Megabytes;
let nrMonths: Months;
let unusedData: Megabytes;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!myPlan) {
        myPlan = parseInt(input);
    } else if (!nrMonths) {
        nrMonths = parseInt(input);
        unusedData = myPlan * (nrMonths + 1);
    } else {
        unusedData -= parseInt(input);
    }
}).on('close', () => {
    console.log(unusedData);
});
