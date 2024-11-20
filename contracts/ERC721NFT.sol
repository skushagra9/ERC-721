// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract ERC721AI is
    Initializable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    uint256 public tokenCounter;

    struct Metadata {
        string name;
        string tokenURI;
        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(uint256 => Metadata) private tokenIdToMetadata;
    mapping(address => bool) public verifiedUsers;

    event PositionTransferred(
        uint256 indexed tokenId,
        address indexed from,
        address indexed to
    );
     event TokenMinted(uint256 indexed tokenId, address indexed to);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC721_init("AI Agent NFT", "AIA");
        __ERC721URIStorage_init();
        __Ownable_init();
        __ReentrancyGuard_init();

        tokenCounter = 0;
    }

    function setVerifiedUser(address user) external onlyOwner {
        verifiedUsers[user] = true;
    }

    /**
     * @dev Allows the creation of a new AI agent NFT.
     * @param _name Name of the AI agent.
     * @param _tokenURI URL to the metadata JSON file.
     * @return tokenId ID of the newly minted NFT.
     */
    function mintAI(
        address to,
        string memory _name,
        string memory _tokenURI
    ) external onlyOwner nonReentrant returns (uint256 tokenId) {
        tokenId = tokenCounter;
        require(verifiedUsers[to], "User not verified");
        _safeMint(to, tokenId);

        Metadata memory metadata = Metadata({
            name: _name,
            tokenURI: _tokenURI,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        tokenIdToMetadata[tokenId] = metadata;
        _setTokenURI(tokenId, _tokenURI);

        tokenCounter++;
        emit TokenMinted(tokenId, to);
    }

    // Function to get metadata for a specific token ID
    function getTokenId(uint256 tokenId) public view returns (Metadata memory) {
        require(_exists(tokenId), "ERC721: token ID not found");
        return tokenIdToMetadata[tokenId];
    }

    function transferPosition(
        uint256 tokenId,
        address to
    ) external nonReentrant {
        require(_exists(tokenId), "ERC721: token ID not found");
        require(
            ownerOf(tokenId) == msg.sender,
            "Only the owner can transfer the token"
        );

        _transfer(msg.sender, to, tokenId);
        emit PositionTransferred(tokenId, msg.sender, to);
    }

    /**
     * @dev Allows the owner to destroy the NFT.
     * @param tokenId ID of the NFT to burn.
     */
    function burn(uint256 tokenId) external nonReentrant {
        require(_exists(tokenId), "ERC721: token ID not found"); // Check if the token exists
        require(
            ownerOf(tokenId) == msg.sender,
            "Only the owner can burn the token"
        );

        _burn(tokenId);
        delete tokenIdToMetadata[tokenId];
        emit Transfer(msg.sender, address(0), tokenId);
    }
}