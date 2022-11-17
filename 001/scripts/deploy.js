const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with this account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Account Balance: ${balance.toString()}`);

  const Arbit = await ethers.getContractFactory('Arbit');
  const arbit = await Arbit.deploy();
  console.log(`Token Address: ${arbit.address}`);
  
  const data = {
    address: arbit.address  
  };
  fs.writeFileSync('frontend/src/artifacts/Address.json', JSON.stringify(data));

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error);
    process.exit(1);
  })
