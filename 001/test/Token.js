const { expect } = require('chai');

describe("Number", function() {
    it("Should update the value of num", async function() {
      const Token = await ethers.getContractFactory("Token");
      const token = await Token.deploy()

      await token.setNum(500)
      expect(await token.getNum()).to.equal(500);

      await token.setNum(9096055450)
      expect(await token.getNum()).to.equal(9096055450);
    });
});
