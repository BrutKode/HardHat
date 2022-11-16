require("dotenv").config()

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: process.env.INFURA_API,
      },
    },
  }
};
