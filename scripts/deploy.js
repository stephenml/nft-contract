const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("check-balance", "Prints out the balance of your account").setAction(async function (taskArguments, hre) {
  const account = getAccount();
  console.log(`Account balance for ${account.address}: ${await account.getBalance()}`);
});

task("deploy", "Deploys the NFTContract.sol contract").setAction(async function (taskArguments, hre) {
  const NFTContractFactory = await hre.ethers.getContractFactory("NFTContract", getAccount());
  const contract = await NFTContractFactory.deploy();
  console.log(`Contract deployed to address: ${contract.address}`);
});
