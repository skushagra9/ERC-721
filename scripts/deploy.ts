import { ethers } from "ethers";
import hre from 'hardhat';
import { upgrades } from "hardhat";

async function main() {
  // Get the ContractFactory and Signers here.
  const ERC404AI = await hre.ethers.getContractFactory("ERC404AI");
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the contract
  const erc404AI = await upgrades.deployProxy(ERC404AI, [], {
    initializer: 'initialize',
  });
  console.log("ERC404AI deployed to:",  await erc404AI.getAddress());

  // Wait for deployment to be mined
  await erc404AI.waitForDeployment();
  console.log("ERC404AI successfully deployed!");
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });