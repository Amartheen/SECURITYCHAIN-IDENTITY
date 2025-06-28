// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityRegistry {
    // Mapping to store the IPFS hash associated with each user's Ethereum address
    mapping(address => bytes32) private identities;

    // Event to log when an identity is registered
    event IdentityRegistered(address indexed user, bytes32 ipfsHash);
    event IdentityUpdated(address indexed user, bytes32 newIpfsHash);
    event IdentityRevoked(address indexed user); // For the revoke concept

    /**
     * @dev Registers a new identity by associating an IPFS hash with the caller's address.
     * @param _ipfsHash The IPFS Content Identifier (CID) of the encrypted identity data.
     */
    function registerIdentity(bytes32 _ipfsHash) public {
        require(identities[msg.sender] == bytes32(0), "Identity already registered for this address");
        identities[msg.sender] = _ipfsHash;
        emit IdentityRegistered(msg.sender, _ipfsHash);
    }

    /**
     * @dev Updates the IPFS hash for an existing identity.
     * @param _newIpfsHash The new IPFS Content Identifier (CID).
     */
    function updateIdentity(bytes32 _newIpfsHash) public {
        require(identities[msg.sender] != bytes32(0), "No identity registered to update");
        identities[msg.sender] = _newIpfsHash;
        emit IdentityUpdated(msg.sender, _newIpfsHash);
    }

    /**
     * @dev Retrieves the IPFS hash associated with a given user address.
     * @param _userAddress The Ethereum address of the user.
     * @return The IPFS hash (bytes32 format). Returns 0x0 if no identity is registered.
     */
    function getIdentityHash(address _userAddress) public view returns (bytes32) {
        return identities[_userAddress];
    }

    /**
     * @dev Simulates revoking an identity by clearing its IPFS hash.
     * For hackathon purposes, a simplified revocation for demo.
     * In a real app, this would have robust access control.
     */
    function revokeIdentity() public {
        require(identities[msg.sender] != bytes32(0), "No identity to revoke");
        delete identities[msg.sender]; // Clear the mapping entry
        emit IdentityRevoked(msg.sender);
    }
}