// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity ^0.8.17;

contract WishBank {
    string public wish;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

     function checkWisher() public view returns (address) {
        return owner;
    }

    function makeNewWish(string memory _newWish) public {
        wish = _newWish;
    }

    function showWish() public view returns (string memory) {
        return wish;
    }
   
}