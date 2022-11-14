//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract Box {
    uint256 public num;

    function initialize(uint256 _num) external {
        num = _num;
    }
}
