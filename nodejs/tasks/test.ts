import * as fs from 'fs';
import * as minimist from 'minimist';
import * as path from 'path';
import { Buffer } from 'buffer';
import { exec } from 'child_process';

const BASE_DIR = path.resolve('..');
const DIST_DIR = BASE_DIR + path.sep + 'nodejs' + path.sep + 'dist' + path.sep;
const INPUT_DIR = BASE_DIR + path.sep + 'input' + path.sep;
const OUTPUT_DIR = BASE_DIR + path.sep + 'output' + path.sep;

fs.readdir(DIST_DIR, (err, files) => {
    if (err) {
        throw new Error('You need to build project before testing it!');
    };

    let args = minimist(process.argv, {
        string: ['problem'],
        boolean: ['stdout']
    });
    let filterFn = args.problem ? (s: string) => s.includes(args.problem) : () => true;

    files.filter(filterFn).forEach(file => {
        let problemFolder = path.format({
            name: path.parse(file).name,
            ext: ''
        });

        fs.readdir(INPUT_DIR + problemFolder, (err, samples) => {
            if (err) {
                console.error('✘', file, '( Input folder was not found )');
                return;
            }

            for (let sample of samples) {
                let sampleFile = problemFolder + path.sep + sample;
                let inputFile = INPUT_DIR + sampleFile;
                let outputFile = OUTPUT_DIR + sampleFile;

                let timeStart = args.time ? Date.now() : 0;
                exec(`node ${DIST_DIR + file} < ${inputFile}`, {
                        timeout: 10000
                    },
                    (err, stdout, stderr) => {
                        let timeEnd = args.time ? Date.now() : 0;
                        if (err) {
                            console.log('✘', sampleFile, '(', err.message, ')');
                            return;
                        }

                        if (stderr.length > 0) {
                            console.error(stderr);
                            return;
                        }

                        fs.readFile(outputFile, (err, data) => {
                            if (err) {
                                console.error('✘', sampleFile, '( Output file was not found )');
                                return;
                            }

                            let received = Buffer.isBuffer(stdout) ? stdout : Buffer.from(stdout);
                            let expected = Buffer.isBuffer(data) ? data : Buffer.from(data);

                            if (args.stdout) {
                                console.log(sampleFile, 'produced:');
                                console.log(received.toString());
                            }

                            if (args.time) {
                                console.log(sampleFile, 'timed:', timeEnd - timeStart, 'ms');
                            }

                            console.log(received.equals(expected) ? '✔' : '✘', sampleFile);
                        });
                    }
                );
            }
        });
    });
});
