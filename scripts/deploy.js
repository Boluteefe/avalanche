const hre = require("hardhat");

async function main() {
  const Degen = await hre.ethers.getContractFactory("Degen");

  const degen = await Degen.deploy();
  await degen.waitForDeployment();

  console.log(`degen token deployed to ${degen.target}`);
  // 0x
}

// Hardhat recommends this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});