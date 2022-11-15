require("dotenv").config()

module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/2QTzW_1v8IA1OvXuJ7srKY4kZcdqgqGt",
      },
    },
  }
};
