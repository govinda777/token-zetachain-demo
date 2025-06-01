import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("MeuTokenBasico", function () {
  // Fixture para deployment do contrato
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy do contrato
    const MeuTokenBasico = await ethers.getContractFactory("MeuTokenBasico");
    const token = await MeuTokenBasico.deploy();

    // Mock do gateway address para testes
    const mockGateway = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

    // Inicializar o token
    await token.initialize(
      owner.address,
      "Meu Token Basico",
      "MTB",
      mockGateway,
      500000,
      "0x2ca7d64A7EFE2D62A725E2B35Cf7230D6677FfEe"
    );

    return { token, owner, addr1, addr2, mockGateway };
  }

  describe("Deployment", function () {
    it("Deve definir o nome e símbolo corretos", async function () {
      const { token } = await loadFixture(deployTokenFixture);

      expect(await token.name()).to.equal("Meu Token Basico");
      expect(await token.symbol()).to.equal("MTB");
    });

    it("Deve definir o owner correto", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);

      expect(await token.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", function () {
    it("Owner deve conseguir mintar tokens", async function () {
      const { token, owner, addr1 } = await loadFixture(deployTokenFixture);

      const mintAmount = ethers.parseEther("1000");
      await token.mint(addr1.address, mintAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Não-owner não deve conseguir mintar tokens", async function () {
      const { token, addr1, addr2 } = await loadFixture(deployTokenFixture);

      const mintAmount = ethers.parseEther("1000");

      await expect(
        token.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.reverted;
    });
  });

  describe("Transfer", function () {
    it("Deve permitir transfers normais", async function () {
      const { token, owner, addr1 } = await loadFixture(deployTokenFixture);

      const mintAmount = ethers.parseEther("1000");
      await token.mint(owner.address, mintAmount);

      const transferAmount = ethers.parseEther("100");
      await token.transfer(addr1.address, transferAmount);

      expect(await token.balanceOf(addr1.address)).to.equal(transferAmount);
      expect(await token.balanceOf(owner.address)).to.equal(mintAmount - transferAmount);
    });
  });

  describe("Pausable", function () {
    it("Owner deve conseguir pausar o contrato", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);

      await token.pause();
      expect(await token.paused()).to.be.true;
    });

    it("Transfers devem falhar quando pausado", async function () {
      const { token, owner, addr1 } = await loadFixture(deployTokenFixture);

      const mintAmount = ethers.parseEther("1000");
      await token.mint(owner.address, mintAmount);

      await token.pause();

      await expect(
        token.transfer(addr1.address, ethers.parseEther("100"))
      ).to.be.reverted;
    });
  });
});
