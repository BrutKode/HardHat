const { ethers, upgrades } = require("hardhat");

const PROXY = "0x7CE9D4b67B8f9772b60Be245b346d6F0e615661C";

async function main() {

    const BoxV2 = await ethers.getContractFactory("BoxV2");
    await upgrades.upgradeProxy(PROXY, BoxV2);

    console.log("Upgrade Success");
}
  
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
  