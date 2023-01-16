require("@nomicfoundation/hardhat-toolbox");
require("@chugsplash/plugins");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          outputSelection: {
            "*": {
              "*": ['storageLayout'],
            },
          },
        },
      },
    ]
  }
};
