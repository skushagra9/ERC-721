import hre from 'hardhat';
import { upgrades } from "hardhat";

async function main() {
  // Get the ContractFactory and Signers here.
  const erc721 = await hre.ethers.getContractFactory("ERC721AI");
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the contract
  const ERC721AI = await upgrades.deployProxy(erc721, [], {
    initializer: 'initialize',
  });
  console.log("ERC721AI deployed to:", await ERC721AI.getAddress());

  // Wait for deployment to be mined
  await ERC721AI.waitForDeployment();
  console.log("ERC721AI successfully deployed!");
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });