//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract Token {
  string public name = 'Cheap FTX';
  string public symbol = 'CFTX';
  uint256 public totalSupply = 1000000;
  address public owner;
  mapping(address => uint) balances;

  constructor() {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address _recipient, uint _amount) external {
    require(balances[msg.sender] >= _amount, "Not Enough Funds :(");
    balances[msg.sender] -= _amount;
    balances[_recipient] += _amount;
  }

  function balanceOf(address hodler) external view returns (uint) {
    return balances[hodler];
  }

}

