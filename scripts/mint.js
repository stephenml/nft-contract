const { task } = require("hardhat/config");
const { getContract, getBaseUrl } = require("./helpers");
const fetch = require("node-fetch");

task("mint", "Mints from the NFT contract").addParam("address", "The address to receive a token").setAction(async function (taskArguments, hre) {
  const contract = await getContract("NFTContract", hre);
  const mintPrice = await contract.MINT_PRICE();
  const transactionResponse = await contract.mintTo(taskArguments.address, {
    value: mintPrice,
    gasLimit: 500_000,
  });
  console.log(`Transaction Hash: ${transactionResponse.hash}`);
});

task("set-base-token-uri", "Sets the base token URI for the deployed smart contract").setAction(async function (taskArguments, hre) {
  const contract = await getContract("NFTContract", hre);
  const transactionResponse = await contract.setBaseTokenURI(getBaseUrl(), {
    gasLimit: 500_000,
  });
  console.log(`Transaction Hash: ${transactionResponse.hash}`);
});

task("token-uri", "Fetches the token metadata for the given token ID").addParam("tokenId", "The tokenID to fetch metadata for").setAction(async function (taskArguments, hre) {
  const contract = await getContract("NFTContract", hre);
  const response = await contract.tokenURI(taskArguments.tokenId);

  const metadata_url = response;
  console.log(`Metadata URL: ${metadata_url}`);

  const metadata = await fetch(metadata_url).then(res => res.json());
  console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);
});
