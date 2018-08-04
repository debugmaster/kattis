import { Buffer } from 'buffer';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

const BASE_DIR = path.resolve('.');
const DIST_DIR = BASE_DIR + path.sep + 'dist' + path.sep;
const INPUT_DIR = BASE_DIR + path.sep + 'input' + path.sep;
const OUTPUT_DIR = BASE_DIR + path.sep + 'output' + path.sep;

fs.readdir(DIST_DIR, (err, files) => {
    if (err) {
        throw new Error('You need to build project before testing it!');
    };

    files.forEach(file => {
        let dataFile = path.format({ name: path.parse(file).name, ext: '.txt'});

        fs.access(INPUT_DIR + dataFile, (err) => {
            if (err) {
                console.log('✘', file, '( Input file was not found )');
                return;
            }

            exec(`node ${DIST_DIR + file} < ${INPUT_DIR + dataFile}`,
                { timeout: 10000 },
                (err, stdout, stderr) => {
                    if (err) {
                        console.log('✘', file, '(', err, ')');
                        return;
                    }

                    if (stderr.length > 0) {
                        console.log(stderr);
                    }

                    fs.readFile(OUTPUT_DIR + dataFile, (err, data) => {
                        if (err) {
                            console.log('✘', file, '( Output file was not found )');
                            return;
                        }

                        let received = Buffer.isBuffer(stdout) ? stdout : Buffer.from(stdout);
                        let expected = Buffer.isBuffer(data) ? data : Buffer.from(data);

                        console.log(received.equals(expected) ? '✔' : '✘', file);
                    });
                }
            );
        });
    });
});
