import { ethers } from "hardhat";

async function main() {

  const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
  const multiSig = await MultiSigWallet.deploy();

  await multiSig.deployed();

  console.log(`Your multi-sig wallet is deployed to ${multiSig.address}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
