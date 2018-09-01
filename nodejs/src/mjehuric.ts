import * as Readline from 'readline';

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    let sequence = input.split(' ');
    /**
     * The following algorithm is also known as Bubble sort.
     * https://en.wikipedia.org/wiki/Bubble_sort
     */
    let hasSwapped: boolean;
    do {
        hasSwapped = false;
        for (let i = 0, max = sequence.length - 1; i < max; i++) {
            // Please note that comparisons are performed on strings
            // A generic solution should be based on comparing integers
            if (sequence[i] > sequence[i+1]) {
                let aux = sequence[i];
                sequence[i] = sequence[i+1];
                sequence[i+1] = aux;
                hasSwapped = true;
                print(sequence);
            }
        }
    } while (hasSwapped);
});

function print(sequence: string[]) {
    console.log(sequence.join(' '));
}
