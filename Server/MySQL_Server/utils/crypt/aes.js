let crypto = require('crypto');

function encrypt(data, key, callback) {
    const _key = crypto.scryptSync(key, 'salt', 24);
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    let cipher = crypto.createCipheriv('aes-192-cbc', _key, iv);
    let encrypted = '';

    cipher.on('readable', () => {
        let chunk;
        while (null !== (chunk = cipher.read())) {
            encrypted += chunk.toString('hex');
        }
    });

    cipher.on('end', () => {
        callback(encrypted);
    });

    cipher.write(data);
    cipher.end();
}

function decrypt(data, key, callback) {

    const _key = crypto.scryptSync(key, 'salt', 24);
    const iv = Buffer.alloc(16, 0); // Initialization vector.

    const decipher = crypto.createDecipheriv('aes-192-cbc', _key, iv);

    let decrypted = '';

    decipher.on('readable', () => {
        while (null !== (chunk = decipher.read())) {
            decrypted += chunk.toString('utf8');
        }
    });

    decipher.on('end', () => {
        callback(decrypted);
    });


    decipher.write(data, 'hex');
    decipher.end();
}

module.exports = {
    Encrypt: encrypt,
    Decrypt: decrypt,
}