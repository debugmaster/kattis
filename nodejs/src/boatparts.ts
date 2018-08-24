import * as Readline from 'readline';

type BoatPart = string;

let numberOfParts: number;
let numberOfReplacements: number;
let parts: Set<BoatPart>;
let currentDay: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!numberOfReplacements) {
        [numberOfParts, numberOfReplacements] = input.split(' ').map((s) => parseInt(s));
        currentDay = 1;
        parts = new Set();
        return;
    }

    // If all parts are replaced, it needs to discard any replacement.
    if (numberOfParts === parts.size) {
        numberOfReplacements--;
        return;
    }

    parts.add(input);

    // Check if all parts are replaced
    // It doesn't need to check if number of days can't be enough to replace all parts
    if (currentDay >= numberOfParts && numberOfParts === parts.size) {
        console.log(currentDay);
    }

    currentDay++;
    numberOfReplacements--;

    // Check if some part was not replaced after all replacements.
    if (!numberOfReplacements && numberOfParts > parts.size) {
        console.log('paradox avoided');
    }
});
