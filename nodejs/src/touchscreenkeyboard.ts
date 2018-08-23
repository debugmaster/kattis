import * as Readline from 'readline';

const KEYBOARD = [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm' ];

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    state = next(state, input);
});

enum State {
    START,
    READ_TEST_CASES,
    READ_TEST_CASE,
    READ_ENTRY,
    END
}

interface Entry {
    word: string;
    distance: number;
}

let state = State.START;
let numberOfTestCases: number;
let word: string;
let entries = [] as Array<Entry>;
let numberOfEntries: number;

function next(state: State, input: string): State {
    if (state === State.START) {
        return next(State.READ_TEST_CASES, input);
    } else if (state === State.READ_TEST_CASES) {
        numberOfTestCases = parseInt(input);
        return State.READ_TEST_CASE;
    } else if (state === State.READ_TEST_CASE) {
        numberOfTestCases--;
        let [s1, s2] = input.split(' ');
        word = s1;
        numberOfEntries = parseInt(s2);
        return State.READ_ENTRY;
    } else if (state === State.READ_ENTRY) {
        numberOfEntries--;
        entries.push({
            word: input,
            distance: computeDistance(word, input)
        });

        if (numberOfEntries > 0) {
            return state;
        } else {
            sortAndPrint(entries);
            entries = [];
        }

        if (numberOfTestCases > 0) {
            return State.READ_TEST_CASE;
        } else {
            return State.END;
        }
    }

    throw new Error('invalid state');
}

function computeDistance(s1: string, s2: string): number {
    let distance, x1, x2, y1, y2;
    distance = x1 = x2 = y1 = y2 = 0;
    for (let i = 0; i < s1.length; i++) {
        y1 = KEYBOARD.findIndex(function (keyboardRow: string) {
            return (x1 = keyboardRow.indexOf(s1[i])) >= 0;
        });
        y2 = KEYBOARD.findIndex(function (keyboardRow: string) {
            return (x2 = keyboardRow.indexOf(s2[i])) >= 0;
        });
        distance += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
    return distance;
}

function sortAndPrint(entries: Array<Entry>): void {
    let sortedEntries = entries.sort( function (a: Entry, b: Entry): number {
        return a.distance - b.distance || a.word.localeCompare(b.word);
    })
    sortedEntries.forEach( function (e: Entry) {
        console.log(e.word, e.distance);
    })
}
