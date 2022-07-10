const { task } = require("hardhat/config");
const { getAccount, getContract } = require("./helpers");

task("withdraw", "Transfer the ETH hold by the SC to the account").setAction(async function (taskArguments, hre) {
  const account = getAccount();
  const contract = await getContract("NFTContract", hre);
  const transactionResponse = await contract.withdrawPayments(account.address, {
    gasLimit: 500_000,
  });
  console.log(`Transaction Hash: ${transactionResponse.hash}`);
});
