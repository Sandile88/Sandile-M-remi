require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  // defaultNetwork: "localhost",
  networks: {
    scrollSepolia: {
      url: process.env.SCROLL_SEPOLIA_RPC_URL, 
      accounts: [process.env.PRIVATE_KEY], 
    },
  },
};
