import { expect } from "chai";
import { ERC404AI } from "../typechain-types";
import hre from 'hardhat'

describe("ERC404AI", function () {
  let erc404AI: ERC404AI;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await hre.ethers.getSigners();

    const ERC404AI = await hre.ethers.getContractFactory("ERC404AI");
    erc404AI = await ERC404AI.deploy();
    await erc404AI.waitForDeployment();
  });

  it("Should mint a new AI agent NFT", async function () {
    const name = "AI Agent 1";
    const description = "Description of AI Agent 1";
    const image = "https://example.com/image.png";
    const capabilities = ["skill1", "skill2"];
    const version = "1.0.0";

    await expect(
      erc404AI.mintAI(name, description, image, capabilities, version)
    ).to.emit(erc404AI, "Transfer");

    const tokenId = 0; 
    const tokenMetadata = await erc404AI.getTokenId(tokenId);
    

    expect(tokenMetadata.name).to.equal(name);
    expect(tokenMetadata.description).to.equal(description);
    expect(tokenMetadata.image).to.equal(image);
    expect(tokenMetadata.capabilities).to.deep.equal(capabilities);
    expect(tokenMetadata.version).to.equal(version);
  });

  it("Should update the metadata of an existing AI agent NFT", async function () {
    const name = "AI Agent 1";
    const description = "Description of AI Agent 1";
    const image = "https://example.com/image.png";
    const capabilities = ["skill1", "skill2"];
    const version = "1.0.0";

    await erc404AI.mintAI(name, description, image, capabilities, version);

    const newDescription = "Updated description";
    const newImage = "https://example.com/updated-image.png";
    const newCapabilities = ["new-skill1"];
    const newVersion = "1.1.0";

    await expect(
      erc404AI.updateMetadata(0, newDescription, newImage, newCapabilities, newVersion)
    ).to.emit(erc404AI, "MetadataUpdated");

    const updatedMetadata = await erc404AI.getTokenId(0);

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

    await erc404AI.mintAI(name, description, image, capabilities, version);

    // Burn the token
    await expect(erc404AI.burn(0)).to.emit(erc404AI, "Transfer");

    // Check that querying the token metadata results in a revert
    await expect(erc404AI.getTokenId(0)).to.be.revertedWith(
      "ERC404: token ID not found"
    );
  });
});
