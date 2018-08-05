import * as Readline from 'readline';

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    let [, switches] = input.split(' ').map((s) => parseInt(s));
    /**
     * Note that the valid pairs are:
     * - 0 junctions and 2 switches;
     * - 1 junctions and 0 switches;
     * - 1 junctions and 2 switches;
     * - 1 junctions and 4 switches;
     * - 2 junctions and 4 switches;
     *
     * There is no pair when switches are oddly numbered, then
     * it makes impossible to find a solution when it happens.
     */
    console.log( switches % 2 === 1 ? 'impossible' : 'possible');
});
