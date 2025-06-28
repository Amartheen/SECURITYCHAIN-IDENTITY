const { ethers } = require("hardhat");

async function main() {
  const IdentityRegistry = await ethers.getContractFactory("IdentityRegistry");

  // Deploy the contract
  const identityRegistry = await IdentityRegistry.deploy();

  // Wait for the deployment transaction to be mined and confirmed.
  // In newer ethers.js/Hardhat versions, you can often just await the deploy call directly,
  // or use .waitForDeployment() if you need to be explicit.
  // Let's use await identityRegistry.waitForDeployment();
  await identityRegistry.waitForDeployment();


  console.log("IdentityRegistry deployed to:", await identityRegistry.getAddress());
  // IMPORTANT: Log the contract address. You'll need this.
  // Also, you'll need the ABI (Application Binary Interface) for frontend interaction.
  // The ABI is usually found in artifacts/contracts/IdentityRegistry.sol/IdentityRegistry.json
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });