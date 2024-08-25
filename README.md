# ERC721AI Project

## Overview

The **ERC721AI** project is an upgradeable smart contract implementation for ERC-721 tokens with extended functionalities. This contract allows for the creation, management, and transfer of AI agent NFTs. It utilizes OpenZeppelin's upgradeable contracts to ensure upgradability and security. 

## Deployment Details

The `ERC721AI` contract has been successfully deployed to the sepolia network. Below are the details of the deployment:

- **Deployer Account**: `0x6fd6E5fCfB4f526AeC218079aDeC118a7F3A6540`
- **Contract Address**: `0xCD2187Ddc853ea10358Eba78c4d1DF2a80Dfb7c3`
- **Transaction Link**: [View on Sepolia Scan](https://sepolia.etherscan.io/tx/0x59d4ca5cf674a26340ac545852e2183eead42aa8d392cd5b576858abf3811749)

The contract is now live and can be interacted with on the Sepolia test network.


## Contract Description

### ERC721AI Contract

The `ERC721AI` contract extends OpenZeppelin's `ERC721URIStorageUpgradeable`, `OwnableUpgradeable`, and `ReentrancyGuardUpgradeable` contracts. It allows for:

- **Minting AI Agent NFTs**: Create new NFTs with specific metadata including name, description, image, capabilities, and version.
- **Metadata Management**: Update the metadata of existing NFTs.
- **Transfer of Ownership**: Transfer the ownership of NFTs to different addresses.
- **Burning NFTs**: Permanently destroy NFTs when no longer needed.

#### Contract Functions

- **`mintAI`**: Mint a new AI agent NFT with provided metadata.
- **`updateMetadata`**: Update the metadata of an existing NFT.
- **`transferPosition`**: Transfer the ownership of an NFT.
- **`burn`**: Destroy an NFT.
- **`generateTokenURI`**: Generate the URI for token metadata.

## Public and External Functions

### **`mintAI`**

- **Visibility**: `external`
- **Function**: Allows the owner to mint a new AI agent NFT.
- **Parameters**:
  - `_name`: Name of the AI agent.
  - `_description`: Description of the AI agent.
  - `_image`: URL to an image representing the AI agent.
  - `_capabilities`: List of skills or functions the AI agent can perform.
  - `_version`: Current version of the AI agent.
- **Returns**: `tokenId` - The ID of the newly minted NFT.
- **Modifiers**: `onlyOwner`, `nonReentrant`
- **Events**: `MetadataUpdated`

### **`getTokenId`**

- **Visibility**: `public`
- **Function**: Retrieves metadata for a specific token ID.
- **Parameters**:
  - `tokenId`: The ID of the NFT to query.
- **Returns**: `Metadata` - The metadata associated with the specified token ID.
- **Modifiers**: None

### **`transferPosition`**

- **Visibility**: `external`
- **Function**: Allows the owner to transfer the NFT to another address.
- **Parameters**:
  - `tokenId`: The ID of the NFT to transfer.
  - `to`: Address of the recipient.
- **Modifiers**: `nonReentrant`
- **Events**: `PositionTransferred`

### **`updateMetadata`**

- **Visibility**: `external`
- **Function**: Allows the owner to update the metadata of an existing NFT.
- **Parameters**:
  - `tokenId`: The ID of the NFT to update.
  - `_description`: Updated description of the AI agent.
  - `_image`: Updated URL to an image representing the AI agent.
  - `_capabilities`: Updated list of skills or functions the AI agent can perform.
  - `_version`: Updated version of the AI agent.
- **Modifiers**: `nonReentrant`
- **Events**: `MetadataUpdated`

### **`burn`**

- **Visibility**: `external`
- **Function**: Allows the owner to destroy the NFT.
- **Parameters**:
  - `tokenId`: The ID of the NFT to burn.
- **Modifiers**: `nonReentrant`
- **Events**: `Transfer` (from owner to address(0))

### **`generateTokenURI`**

- **Visibility**: `internal`
- **Function**: Generates a token URI pointing to the metadata JSON file.
- **Parameters**:
  - `tokenId`: The ID of the NFT.
- **Returns**: `string` - URI string representing the token metadata.
- **Modifiers**: None

### **`uint2str`**

- **Visibility**: `internal`
- **Function**: Converts a `uint256` to a string.
- **Parameters**:
  - `_i`: The integer to convert.
- **Returns**: `string` - The resulting string.
- **Modifiers**: None

## Testing Scripts

The testing scripts validate the functionality and security of the `ERC721AI` contract. Below is an overview of what is tested:

### **Deployment**

- **Test Objective**: Ensure the contract is deployed with the correct name and symbol.
- **Details**: Verifies that the contract's `name` and `symbol` match the expected values.

### **Minting**

- **Test Objective**: Validate that new NFTs can be minted properly.
- **Details**: Checks if the minting function correctly creates a new NFT and sets its metadata. The test confirms that the token URI reflects the provided metadata.

### **Metadata Update**

- **Test Objective**: Ensure that the NFT metadata can be updated.
- **Details**: Tests updating the metadata of an existing NFT and verifies that the changes are correctly reflected in the token URI.

### **Ownership Transfer**

- **Test Objective**: Verify that ownership of an NFT can be transferred.
- **Details**: Ensures that an NFT's ownership can be transferred from one account to another and confirms that the new owner is correctly assigned.

### **Burning**

- **Test Objective**: Confirm that an NFT can be burned (destroyed).
- **Details**: Tests the burning functionality and ensures that querying ownership of a burned token reverts with the appropriate error.

### RUN TESTS:

```shell
npx hardhat clean
npx hardhat compile
npx hardhat test
```
## RESULTS: 

```
  ✔ should have the correct owner
    ✔ Should mint a new AI agent NFT
    ✔ Should transfer an existing AI agent NFT
    ✔ Should update the metadata of an existing AI agent NFT
OldData Result(7) [
  'AI Agent 3',
  'Description of AI Agent 3',
  'https://example.com/image3.png',
  Result(3) [ 'skill1', 'skill2', 'skill3' ],
  '3.0.0',
  1724239487n,
  1724239487n
]
    ✔ Should burn an existing AI agent NFT

·---------------------------------|----------------------------|-------------|-----------------------------·
|      Solc version: 0.8.20       ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
··································|····························|·············|······························
|  Methods                                                                                                 │
·············|····················|··············|·············|·············|···············|··············
|  Contract  ·  Method            ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·············|····················|··············|·············|·············|···············|··············
|  ERC721AI  ·  burn              ·           -  ·          -  ·      94060  ·            2  ·          -  │
·············|····················|··············|·············|·············|···············|··············
|  ERC721AI  ·  mintAI            ·      388458  ·     413391  ·     393445  ·            5  ·          -  │
·············|····················|··············|·············|·············|···············|··············
|  ERC721AI  ·  transferPosition  ·           -  ·          -  ·      65127  ·            2  ·          -  │
·············|····················|··············|·············|·············|···············|··············
|  ERC721AI  ·  updateMetadata    ·           -  ·          -  ·     136010  ·            2  ·          -  │
·············|····················|··············|·············|·············|···············|··············
|  Deployments                    ·                                          ·  % of limit   ·             │
··································|··············|·············|·············|···············|··············
|  ERC721AI                       ·           -  ·          -  ·    4490423  ·         15 %  ·          -  │
·---------------------------------|--------------|-------------|-------------|---------------|-------------·

  5 passing (944ms)
  ```

## Deployment

To deploy the `ERC721AI` contract, you can use the provided deployment script. This script deploys the contract using an upgradeable proxy setup. Ensure you have Hardhat and OpenZeppelin's upgrades package installed.


## Deploy Commands:

```shell
npx hardhat run scripts/deploy.ts --network sepolia
```

### Deployment Script

```typescript
import { ethers } from "ethers";
import hre from 'hardhat';
import { upgrades } from "hardhat";

async function main() {
  // Get the ContractFactory and Signers here.
  const ERC721AI = await hre.ethers.getContractFactory("ERC721AI");
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the contract
  const ERC721AI = await upgrades.deployProxy(ERC721AI, [], {
    initializer: 'initialize',
  });
  console.log("ERC721AI deployed to:",  await ERC721AI.getAddress());

  // Wait for deployment to be mined
  await ERC721AI.deployed();
  console.log("ERC721AI successfully deployed!");
}

// Run the script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
```

## Upgrade Scripts

Upgrading the `ERC721AI` contract involves deploying a new implementation while preserving the state of the existing proxy. The upgrade process is outlined below:

### **Upgrade Process**

1. **Script Overview**: The upgrade script uses Hardhat to deploy a new implementation of the `ERC721AI` contract to an existing proxy.
2. **Procedure**:
   - **Get Signer**: Identifies the deployer account.
   - **Get ContractFactory**: Retrieves the factory for the new implementation of `ERC721AI`.
   - **Upgrade Proxy**: Upgrades the proxy to point to the new implementation.
   - **Logging**: Outputs the address of the upgraded contract and confirms successful deployment.

## Client Scripts

The client script is used to upload metadata for NFTs to IPFS using the NFT.Storage service. Here’s how it works:

### **Client Script Overview**

1. **Setup**:
   - **NFT.Storage Initialization**: Uses an API key to interact with the NFT.Storage service.
   - **Upload Metadata**: Converts metadata into JSON format and uploads it as a file to IPFS.
2. **Metadata Details**:
   - **Name**: Name of the AI agent.
   - **Description**: Description of the AI agent.
   - **Image**: URL to an image representing the AI agent.
   - **Capabilities**: List of skills or functions the AI agent can perform.
   - **Version**: Current version of the AI agent.
   - **Timestamps**: Creation and update times.

PS: For Client Script, there will many changes to the code, and it wouldn't be exactly the same as before , according to the DOC - we can add this approach in another contract
