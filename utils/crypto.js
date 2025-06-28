const CryptoJS = require('crypto-js');

/**
 * @dev Encrypts data using AES encryption with a given key.
 * @param {string} data - The data to encrypt (should be stringified JSON or plain text).
 * @param {string} secretKey - The secret key for encryption/decryption.
 * @returns {string} The encrypted data as a Base64 string.
 */
function encryptData(data, secretKey) {
    if (!data || !secretKey) {
        throw new Error("Data and secret key are required for encryption.");
    }
    try {
        const encrypted = CryptoJS.AES.encrypt(data, secretKey).toString();
        console.log('Data encrypted.');
        return encrypted;
    } catch (error) {
        console.error('Error encrypting data:', error);
        throw error;
    }
}

/**
 * @dev Decrypts data using AES decryption with a given key.
 * @param {string} encryptedData - The encrypted data (Base64 string).
 * @param {string} secretKey - The secret key for encryption/decryption.
 * @returns {string} The decrypted data as a string.
 */
function decryptData(encryptedData, secretKey) {
    if (!encryptedData || !secretKey) {
        throw new Error("Encrypted data and secret key are required for decryption.");
    }
    try {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
        console.log('Data decrypted.');
        return decrypted;
    } catch (error) {
        console.error('Error decrypting data:', error);
        throw error;
    }
}

module.exports = {
    encryptData,
    decryptData
};