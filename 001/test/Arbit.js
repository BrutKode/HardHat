const { expect } = require('chai');

describe("Arbit", function() {
    it("Should transfer owner", async function() {
      const Arbit = await ethers.getContractFactory("Arbit");
      const arbit = await Arbit.deploy()

      await arbit.transferOwnership("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      expect(await arbit.returnOwner()).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });
    
    it("Should return null allowance", async function() {
      const Arbit = await ethers.getContractFactory("Arbit");
      const arbit = await Arbit.deploy()

      expect(await arbit.returnAllowance()).to.equal(0);
    });
    
    it("Should return null balance", async function() {
      const Arbit = await ethers.getContractFactory("Arbit");
      const arbit = await Arbit.deploy()

      expect(await arbit.returnAmountOfDAI()).to.equal(0);
      expect(await arbit.returnAmountOfWETH()).to.equal(0);
    });
    
});
