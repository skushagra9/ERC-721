// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ERC404AI is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 public tokenCounter;

    struct Metadata {
        string name;
        string description;
        string image;
        string[] capabilities;
        string version;
        uint256 createdAt;
        uint256 updatedAt;
    }

    mapping(uint256 => Metadata) private tokenIdToMetadata;

    event MetadataUpdated(uint256 indexed tokenId);

    constructor() ERC721("AI Agent NFT", "AIA") {
        tokenCounter = 0;
    }

    /**
     * @dev Allows the creation of a new AI agent NFT.
     * @param _name Name of the AI agent.
     * @param _description Description of the AI agent.
     * @param _image URL to an image representing the AI agent.
     * @param _capabilities List of skills or functions the AI agent can perform.
     * @param _version Current version of the AI agent.
     * @return tokenId ID of the newly minted NFT.
     */
    function mintAI(
        string memory _name,
        string memory _description,
        string memory _image,
        string[] memory _capabilities,
        string memory _version
    ) external onlyOwner nonReentrant returns (uint256 tokenId) {
        tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);

        Metadata memory metadata = Metadata({
            name: _name,
            description: _description,
            image: _image,
            capabilities: _capabilities,
            version: _version,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        tokenIdToMetadata[tokenId] = metadata;

        string memory tokenURI = generateTokenURI(tokenId);
        _setTokenURI(tokenId, tokenURI);

        tokenCounter++;
    }
    
     // Function to get metadata for a specific token ID
    function getTokenId(uint256 tokenId) public view returns (Metadata memory) {
        return tokenIdToMetadata[tokenId];
    }

    /**
     * @dev Allows the owner to update the AI agent's metadata.
     * @param tokenId ID of the NFT to update.
     * @param _description Updated description of the AI agent.
     * @param _image Updated URL to an image representing the AI agent.
     * @param _capabilities Updated list of skills or functions the AI agent can perform.
     * @param _version Updated version of the AI agent.
     */
    function updateMetadata(
        uint256 tokenId,
        string memory _description,
        string memory _image,
        string[] memory _capabilities,
        string memory _version
    ) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can update the metadata");

        Metadata storage metadata = tokenIdToMetadata[tokenId];
        metadata.description = _description;
        metadata.image = _image;
        metadata.capabilities = _capabilities;
        metadata.version = _version;
        metadata.updatedAt = block.timestamp;

        string memory tokenURI = generateTokenURI(tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit MetadataUpdated(tokenId);
    }

    /**
     * @dev Allows the owner to destroy the NFT.
     * @param tokenId ID of the NFT to burn.
     */
function burn(uint256 tokenId) external nonReentrant {
    require(_exists(tokenId), "ERC404: token ID not found"); // Check if the token exists
    require(ownerOf(tokenId) == msg.sender, "Only the owner can burn the token");
    
    _burn(tokenId);
    delete tokenIdToMetadata[tokenId];
    emit Transfer(msg.sender, address(0), tokenId);
}

    /**
     * @dev Generates a token URI pointing to the metadata JSON file.
     * @param tokenId ID of the NFT.
     * @return URI string representing the token metadata.
     */
    function generateTokenURI(uint256 tokenId) internal view returns (string memory) {
        Metadata memory metadata = tokenIdToMetadata[tokenId];
        // Normally you'd host the metadata off-chain and return the URL here
        // For simplicity, returning a basic string, but this should be an actual URI
        return string(abi.encodePacked("https://example.com/metadata/", uint2str(tokenId), ".json"));
    }

    /**
     * @dev Converts a uint256 to string.
     * @param _i The integer to convert.
     * @return The resulting string.
     */
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
