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
        unusedData = 0;
    } else {
        unusedData += (myPlan - parseInt(input));

        if (!--nrMonths) {
            console.log(myPlan /* of next month */ + unusedData);
            myPlan = 0;
        }
    }
});
