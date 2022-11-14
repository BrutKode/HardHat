const { ethers, upgrades } = require("hardhat");

async function main() {

  const Box = await ethers.getContractFactory("Box");

  const box = await upgrades.deployProxy(Box, [9440], {
    initializer: "initialize",
  });

  await box.deployed();

  console.log(
    `Contract deployed to ${box.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
