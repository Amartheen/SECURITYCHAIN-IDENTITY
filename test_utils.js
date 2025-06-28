// test_utils.js
const { uploadToIpfs, retrieveFromIpfs } = require('./utils/ipfs');
const { encryptData, decryptData } = require('./utils/crypto');

async function runTest() {
    const secretKey = "yourVerySecretKey"; // Replace with a strong, temporary key for testing
    const userData = {
        name: "Alice",
        email: "alice@example.com",
        age: 30
    };
    const userDataString = JSON.stringify(userData);

    console.log("Original Data:", userDataString);

    try {
        // 1. Encrypt Data
        const encrypted = encryptData(userDataString, secretKey);
        console.log("Encrypted Data:", encrypted);

        // 2. Upload to IPFS
        const ipfsCid = await uploadToIpfs(encrypted);
        console.log("IPFS CID:", ipfsCid);

        // 3. Retrieve from IPFS
        const retrievedEncrypted = await retrieveFromIpfs(ipfsCid);
        console.log("Retrieved Encrypted Data:", retrievedEncrypted);

        // 4. Decrypt Data
        const decrypted = decryptData(retrievedEncrypted, secretKey);
        console.log("Decrypted Data:", decrypted);

        // Verify
        if (decrypted === userDataString) {
            console.log("Test PASSED: Original and decrypted data match!");
        } else {
            console.error("Test FAILED: Data mismatch!");
        }

    } catch (error) {
        console.error("Test encountered an error:", error);
    }
}

runTest();