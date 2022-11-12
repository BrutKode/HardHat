//SPDX-License-Identifier: MIT
pragma solidity 0.8.8;

import "hardhat/console.sol";

contract Token {

    uint256 num;

    function setNum(uint256 _num) external {
        console.log("Value of Num: ", num);
        num = _num;
        console.log("Updated Value: ", num);
    }

    function getNum() external view returns (uint256) {
        return num;
    }

}

