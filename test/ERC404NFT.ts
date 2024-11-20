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
    const tokenURI = "https://example.com/image.png";
    const userAddress = addr1.address;
    await ERC721AI.setVerifiedUser(userAddress);
    await expect(
      ERC721AI.mintAI(userAddress, name, tokenURI)
    ).to.emit(ERC721AI, "TokenMinted");

    const tokenId = 0;
    const tokenMetadata = await ERC721AI.getTokenId(tokenId);


    expect(tokenMetadata.name).to.equal(name);
    expect(tokenMetadata.tokenURI).to.equal(tokenURI);
  });

  it("Should transfer an existing AI agent NFT", async function () {
    const name = "AI Agent 1";
    const tokenURI = "https://example.com/image.png";
    const userAddress = addr1.address;
    await ERC721AI.setVerifiedUser(userAddress);
    await ERC721AI.mintAI(userAddress, name, tokenURI)


    expect(await ERC721AI.ownerOf(0)).to.equal(addr1.address);

    await expect(
      ERC721AI.connect(addr1).transferPosition(0, addr2.address) 
    ).to.emit(ERC721AI, "PositionTransferred");

    expect(await ERC721AI.ownerOf(0)).to.equal(addr2.address);
  });


  it("Should burn an existing AI agent NFT", async function () {
    const name = "AI Agent 1";
    const tokenURI = "https://example.com/image.png";
    const userAddress = addr1.address;
    await ERC721AI.setVerifiedUser(userAddress);
    await ERC721AI.mintAI(userAddress, name, tokenURI)

    expect(await ERC721AI.ownerOf(0)).to.equal(addr1.address);

    // Burn the token by addr1
    await expect(ERC721AI.connect(addr1).burn(0)).to.emit(ERC721AI, "Transfer");

    // Verify token metadata has been removed
    await expect(ERC721AI.getTokenId(0)).to.be.revertedWith("ERC721: token ID not found");
  });
});
