const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

// Helper method for fetching environment variables from .env
function getEnvVariable(key) {
  if (process.env[key]) {
    return process.env[key];
  }
  throw `${key} is not defined and no default value was provided`;
}

// Helper method for fetching a connection provider to the Ethereum network
function getProvider() {
  return ethers.getDefaultProvider(getEnvVariable("NETWORK"), {
    alchemy: getEnvVariable("ALCHEMY_KEY"),
  });
}

// Helper method for fetching a wallet account using an environment variable for the PK
function getAccount() {
  return new ethers.Wallet(getEnvVariable("ACCOUNT_PRIVATE_KEY"), getProvider());
}

// Helper method for fetching a contract instance at a given address
function getContract(contractName, hre) {
  const account = getAccount();
  return getContractAt(hre, contractName, getEnvVariable("NFT_CONTRACT_ADDRESS"), account);
}

// Helper method for fetching a IPFS Gateway URL
function getBaseUrl() {
  return getEnvVariable("BASE_URL")
}

module.exports = {
  getEnvVariable,
  getProvider,
  getAccount,
  getContract,
  getBaseUrl,
}
