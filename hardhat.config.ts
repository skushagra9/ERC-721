import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
const dotenv = require('dotenv')

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
  networks: {
    holesky: {
      url: process.env.HTTP_PROVIDER_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  gasReporter: { enabled: true },
};

export default config;
