// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTContract is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private currentTokenId;

  constructor() ERC721("NFTContract", "NFT") {}

  function mintTo(address recipient) public returns (uint256) {
    currentTokenId.increment();
    uint256 newItemId = currentTokenId.current();
    _safeMint(recipient, newItemId);
    return newItemId;
  }
}
