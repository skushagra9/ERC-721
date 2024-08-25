import { expect } from "chai";
import { ERC721AI } from "../typechain-types";
import hre from 'hardhat';
import { upgrades } from "hardhat";

describe("ERC721AI", function () {
  let ERC721AI: ERC721AI;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();

    const ERC721AIFactory = await hre.ethers.getContractFactory("ERC721AI");
    
    // Deploy the contract using the upgradeable proxy
    ERC721AI = await upgrades.deployProxy(ERC721AIFactory, [], {
      initializer: 'initialize',
    }) as unknown as ERC721AI;

    // Wait for the contract to be deployed
    await ERC721AI.waitForDeployment();
  });

  // Example test case
  it("should have the correct owner", async function () {
    expect(await ERC721AI.owner()).to.equal(owner.address);
  });

  it("Should mint a new AI agent NFT", async function () {
    const name = "AI Agent 1";
    const description = "Description of AI Agent 1";
    const image = "https://example.com/image.png";
    const capabilities = ["skill1", "skill2"];
    const version = "1.0.0";

    await expect(
      ERC721AI.mintAI(name, description, image, capabilities, version)
    ).to.emit(ERC721AI, "Transfer");

    const tokenId = 0; 
    const tokenMetadata = await ERC721AI.getTokenId(tokenId);
    

    expect(tokenMetadata.name).to.equal(name);
    expect(tokenMetadata.description).to.equal(description);
    expect(tokenMetadata.image).to.equal(image);
    expect(tokenMetadata.capabilities).to.deep.equal(capabilities);
    expect(tokenMetadata.version).to.equal(version);
  });

  it("Should transfer an existing AI agent NFT", async function () {
    const name = "AI Agent 1";
    const description = "Description of AI Agent 1";
    const image = "https://example.com/image.png";
    const capabilities = ["skill1", "skill2"];
    const version = "1.0.0";

    await ERC721AI.mintAI(name, description, image, capabilities, version);

    await expect(
      ERC721AI.transferPosition(0, addr1.address)
    ).to.emit(ERC721AI, "PositionTransferred");

    expect(await ERC721AI.ownerOf(0)).to.equal(addr1.address);
  });
  
  it("Should update the metadata of an existing AI agent NFT", async function () {
    const name = "AI Agent 1";
    const description = "Description of AI Agent 1";
    const image = "https://example.com/image.png";
    const capabilities = ["skill1", "skill2"];
    const version = "1.0.0";

    await ERC721AI.mintAI(name, description, image, capabilities, version);

    const newDescription = "Updated description";
    const newImage = "https://example.com/updated-image.png";
    const newCapabilities = ["new-skill1"];
    const newVersion = "1.1.0";

    await expect(
      ERC721AI.updateMetadata(0, newDescription, newImage, newCapabilities, newVersion)
    ).to.emit(ERC721AI, "MetadataUpdated");

    const updatedMetadata = await ERC721AI.getTokenId(0);

    expect(updatedMetadata.description).to.equal(newDescription);
    expect(updatedMetadata.image).to.equal(newImage);
    expect(updatedMetadata.capabilities).to.deep.equal(newCapabilities);
    expect(updatedMetadata.version).to.equal(newVersion);
  });

  it("Should burn an existing AI agent NFT", async function () {
    const name = "AI Agent 3";
    const description = "Description of AI Agent 3";
    const image = "https://example.com/image3.png";
    const capabilities = ["skill1", "skill2", "skill3"];
    const version = "3.0.0";

    await ERC721AI.mintAI(name, description, image, capabilities, version);
    // Verify token exists
    const dataOld = await ERC721AI.getTokenId(0);
    console.log("OldData", dataOld);

    // Burn the token
    await expect(ERC721AI.burn(0)).to.emit(ERC721AI, "Transfer")
    // Verify token metadata has been removed
    await expect(ERC721AI.getTokenId(0)).to.be.revertedWith("ERC721: token ID not found");
  });
});
