import { NFTStorage, File } from 'nft.storage';
import dotenv from 'dotenv';

dotenv.config();

const nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY as string });

async function uploadMetadata(metadata: object) {
    try {
        const metadataJSON = JSON.stringify(metadata);
        const file = new File([metadataJSON], 'metadata.json', { type: 'application/json' });
        const cid = await nftStorage.storeBlob(file);
        // const uri = `https://ipfs.io/ipfs/${cid}`;
        // console.log('Metadata uploaded to IPFS:', uri);
        return cid;
    } catch (error) {
        console.error('Error uploading metadata to IPFS:', error);
        throw error;
    }
}

// Example usage
const metadata = {
    name: "AI Agent 4",
    description: "Description of AI Agent 4",
    image: "https://example.com/image4.png",
    capabilities: ["skill1", "skill2", "skill3", "skill4"],
    version: "4.0.0",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

uploadMetadata(metadata);
