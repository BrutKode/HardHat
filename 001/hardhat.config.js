/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.8",
  networks: {
    goerli: {
      url: process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
