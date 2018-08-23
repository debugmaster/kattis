import * as Readline from 'readline';

let ciphertext: string;

Readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', (input: string) => {
    if (!ciphertext) {
        ciphertext = input;
    } else {
        console.log(decrypt(ciphertext, input));
        ciphertext = '';
    }
});

const base = 'A'.charCodeAt(0);

function decrypt(encrypted: string, secret: string) {
    let decrypted = '';
    for (let i = 0, l = secret.length; i < encrypted.length; i++) {
        let encryptedCharCode = encrypted.charCodeAt(i);
        let decryptedCharCode;
        if (i < l) {
            decryptedCharCode = encryptedCharCode - secret.charCodeAt(i);
        } else {
            decryptedCharCode = encryptedCharCode - decrypted.charCodeAt(i - l);
        }
        if (decryptedCharCode < 0) {
            decryptedCharCode += 26;
        }
        decrypted += String.fromCharCode(base + decryptedCharCode);
    }

    return decrypted;
}
