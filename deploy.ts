import { deployContract } from "@zetachain/toolkit/helpers";
import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const main = async (args: any, hre: HardhatRuntimeEnvironment) => {
  const [signer] = await hre.ethers.getSigners();

  console.log("🚀 Iniciando deployment do MeuTokenBasico...");
  console.log("📋 Deployer address:", await signer.getAddress());
  console.log("💰 Balance:", hre.ethers.formatEther(await signer.provider.getBalance(signer.address)));

  // Deploy do proxy contract
  const contract = await deployContract({
    contractName: "MeuTokenBasico",
    signer,
    args: [],
  });

  console.log("✅ MeuTokenBasico deployed!");
  console.log("📍 Contract address:", await contract.getAddress());

  // Inicializar o token
  const initTx = await contract.initialize(
    await signer.getAddress(), // owner
    "Meu Token Basico", // nome
    "MTB", // símbolo
    args.gateway, // gateway address
    500000, // gas limit para transfers cross-chain
    "0x2ca7d64A7EFE2D62A725E2B35Cf7230D6677FfEe" // Uniswap V2 Router na ZetaChain (placeholder)
  );

  await initTx.wait();
  console.log("🎯 Token inicializado com sucesso!");

  // Mint inicial para o deployer (1 milhão de tokens)
  const mintTx = await contract.mint(
    await signer.getAddress(),
    hre.ethers.parseEther("1000000")
  );

  await mintTx.wait();
  console.log("💎 1,000,000 MTB tokens mintados para o deployer!");

  return await contract.getAddress();
};

task("deploy", "Deploy MeuTokenBasico contract")
  .addParam("gateway", "Gateway contract address")
  .setAction(main);
