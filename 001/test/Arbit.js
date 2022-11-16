const { expect } = require('chai');

describe("Arbit", function() {
    it("Should transfer owner", async function() {
      const Arbit = await ethers.getContractFactory("Arbit");
      const arbit = await Arbit.deploy()

      await arbit.transferOwnership("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      expect(await arbit.returnOwner()).to.equal("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    });
});
