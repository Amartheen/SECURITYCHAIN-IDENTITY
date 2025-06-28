const { create } = require('ipfs-http-client');

// Connect to the local IPFS daemon API
// Default IPFS API address is http://localhost:5001
const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });

/**
 * @dev Uploads data to IPFS.
 * @param {string} data - The data to upload (e.g., a JSON string).
 * @returns {string} The CID (Content Identifier) of the uploaded data.
 */
async function uploadToIpfs(data) {
    try {
        const { cid } = await ipfs.add(data);
        console.log('Data uploaded to IPFS. CID:', cid.toString());
        return cid.toString(); // Return the CID as a string
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw error; // Re-throw to propagate the error
    }
}

/**
 * @dev Retrieves data from IPFS.
 * @param {string} cid - The CID (Content Identifier) of the data to retrieve.
 * @returns {string} The retrieved data as a string.
 */
async function retrieveFromIpfs(cid) {
    try {
        const chunks = [];
        for await (const chunk of ipfs.cat(cid)) {
            chunks.push(chunk);
        }
        const data = Buffer.concat(chunks).toString('utf8');
        console.log('Data retrieved from IPFS for CID:', cid);
        return data;
    } catch (error) {
        console.error('Error retrieving from IPFS:', error);
        throw error;
    }
}

module.exports = {
    uploadToIpfs,
    retrieveFromIpfs
};