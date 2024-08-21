import { ethers } from "ethers";
import hre from 'hardhat';

async function main() {
  // Get the ContractFactory and Signers here.
  const ERC404AI = await hre.ethers.getContractFactory("ERC404AI");
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the contract
  const erc404AI = await ERC404AI.deploy() as unknown as ethers.Contract; // Type assertion
  console.log("ERC404AI deployed to:", erc404AI.deploymentTransaction(), erc404AI.getAddress());

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