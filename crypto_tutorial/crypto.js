const crypto = require('crypto');
const iv = crypto.randomBytes(16); // Initialization vector


// Function to encrypt (cipher) data
function cipherData(data, key) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

// Function to decrypt (decipher) data
function decipherData(encryptedData, key) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}

// Example usage
const plaintext = 'Hello, world!';
const secretKey = 'your-secret-key';

// Cipher the plaintext
const encryptedData = cipherData(plaintext, secretKey);
console.log('Encrypted data:', encryptedData);

// Decipher the encrypted data
const decryptedData = decipherData(encryptedData, secretKey);
console.log('Decrypted data:', decryptedData);
