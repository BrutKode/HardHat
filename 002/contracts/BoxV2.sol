//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

contract BoxV2 {
    uint public num;

    function increment(uint256 _num) external {
        num += 1;
    }
}