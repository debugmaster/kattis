import * as Readline from 'readline';

enum BallMovement {
    A = "A",
    B = "B",
    C = "C"
}

type BallMovements = BallMovement[];
type BallPosition = number;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (movements: BallMovements) => {
    let pos: BallPosition = 1;
    for (let m = 0; m < movements.length; ++m) {
        pos = move(pos, movements[m]);
    }
    console.log(pos);
});

function move(p: BallPosition, m: BallMovement): BallPosition {
    switch (m) {
        case BallMovement.A:
            return switchPlace(p, 1, 2);
        case BallMovement.B:
            return switchPlace(p, 2, 3);
        case BallMovement.C:
            return switchPlace(p, 1, 3);
    }
}

function switchPlace(p: BallPosition, p1: BallPosition, p2: BallPosition): BallPosition {
    return p === p1 ? p2 : p === p2 ? p1 : p;
}
