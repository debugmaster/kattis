import * as Readline from 'readline';

let safetyLimit: number;
let numberEvents: number;
let peopleOnTerrace: number;
let blockedAccess: number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!numberEvents) {
        [safetyLimit, numberEvents] = input.split(' ').map((s) => parseInt(s));
        peopleOnTerrace = blockedAccess = 0;

        // If no events occur, then it will have no blocked access.
        if (!numberEvents) {
            console.log(0);
        }

        return;
    }

    let [ event, sizeOfGroup ] = processInput(input);
    if (event === Event.ENTER) {
        if (peopleOnTerrace + sizeOfGroup > safetyLimit) {
            blockedAccess++;
        } else {
            peopleOnTerrace += sizeOfGroup;
        }
    } else if (event === Event.LEAVE) {
        peopleOnTerrace -= sizeOfGroup;
    }

    if (!--numberEvents) {
        console.log(blockedAccess);
    }
});

enum Event {
    ENTER = 'enter',
    LEAVE = 'leave'
}

function processInput(s: string): [Event, number] {
    let split = s.split(' ');
    return [ split[0] as Event, parseInt(split[1]) ];
}
