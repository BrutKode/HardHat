import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MultiSig", function () {
  
  async function deployMultiSigFixture() {
    
    const [owner, addr1, addr2] = await ethers.getSigners();

    const MultiSigWallet = await ethers.getContractFactory("MultiSigWallet");
    const multiSig = await MultiSigWallet.deploy();

    return { multiSig, owner, addr1, addr2 };
  
  }
  
  async function addOwnersFixture() {
  
    const { multiSig, addr1, addr2 } = await loadFixture(deployMultiSigFixture);
    
    await multiSig.addOwner(addr1.address, 1);
    await multiSig.addOwner(addr2.address, 2);    
  
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { owner, multiSig } = await loadFixture(deployMultiSigFixture);
      expect(await multiSig.isOwner(owner.address));
    });
    it("Should set the right owners", async function () {
      const { multiSig, addr1, addr2 } = await loadFixture(deployMultiSigFixture);
      await loadFixture(addOwnersFixture);
      expect(await multiSig.isOwner(addr1.address));
      expect(await multiSig.isOwner(addr2.address));
    });
  });
  
  
});
