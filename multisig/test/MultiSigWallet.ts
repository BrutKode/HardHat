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

  async function createTXNFixture() {
    const { multiSig, addr1 } = await loadFixture(deployMultiSigFixture);

    const txn = await multiSig.submit(
      addr1.address,
      0,
      "0x0000000000000000000000000000000000000000"
    );

    return { txn };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { owner, multiSig } = await loadFixture(deployMultiSigFixture);
      expect(await multiSig.isOwner(owner.address));
    });

    it("Should set the right owners", async function () {
      const { multiSig, addr1, addr2 } = await loadFixture(
        deployMultiSigFixture
      );
      await loadFixture(addOwnersFixture);
      expect(await multiSig.isOwner(addr1.address));
      expect(await multiSig.isOwner(addr2.address));
    });
  });

  describe("Deposit", function () {
    it("Should deposit funds", async function () {
      const { multiSig, owner } = await loadFixture(deployMultiSigFixture);
      const ONE_ETHER = "1000000000000000000";
      const sendAmount = ONE_ETHER;
      const txn = await owner.sendTransaction({
        to: multiSig.address,
        value: sendAmount,
      });
      expect(txn)
        .to.emit(multiSig, "Deposit")
        .withArgs(owner.address, sendAmount);
    });
  });

  describe("Submit TXN", function () {
    it("Should add TXN to queue", async function () {
      const { multiSig } = await loadFixture(deployMultiSigFixture);
      const { txn } = await loadFixture(createTXNFixture);
      expect(txn).to.emit(multiSig, "Submit").withArgs(1);
    });
  });

  describe("Approve TXN", function () {
    it("Should approve TXN", async function () {
      const { multiSig, owner } = await loadFixture(deployMultiSigFixture);
      const { txn } = await loadFixture(createTXNFixture);
      const trans = await multiSig.approve(2);
      await expect(trans)
        .to.emit(multiSig, "Approve")
        .withArgs(owner.address, 2);
    });
  });
});
