/** @type import('hardhat/config').HardhatUserConfig */

require('hardhat-abi-exporter');
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  abiExporter: [
    {
      path: './frontend/src/artifacts/pretty',
      pretty: true,
    },
    {
      path: './frontend/src/artifacts/ugly',
      pretty: false,
    },
  ],
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: process.env.CMC_API,
  },
  solidity: "0.8.8",
  networks: {
    goerli: {
      url: process.env.INFURA_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  }
};
