// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity ^0.8.17;

contract WishBank {
    string public wish;
    address public wisher;

    constructor(string memory _wish) {
        wish = _wish;
        wisher = msg.sender;
    }

     function checkWisher() public view returns (address) {
        return wisher;
    }

    function makeNewWish(string memory _newWish) public {
        wish = _newWish;
        wisher = msg.sender;
    }

    function showWish() public view returns (string memory) {
        return wish;
    }
   
}