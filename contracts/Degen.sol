// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Degen is ERC20 {
    address public owner;
    uint public nextItemId;

    struct Item {
        address owner;
        uint256 amount;
        string name;
    }

    mapping(uint => Item) public items;

    constructor() ERC20("Degen", "DGN") {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function createItem(uint256 amount, string memory itemName) public onlyOwner {
        nextItemId++;
        Item storage newItem = items[nextItemId];
        newItem.owner = address(this);
        newItem.amount = amount;
        newItem.name = itemName;
    }

    function burn(uint amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
    }

    function transfer(address to, uint256 amount) public override returns (bool success) {
        success = super.transfer(to, amount);
    }

    function redeemItem(uint itemId) public {
        require(itemId < nextItemId, "Item does not exist");
        Item storage itemToRedeem = items[itemId];

        require(itemToRedeem.owner == address(this), "Item already redeemed");
        _burn(msg.sender, itemToRedeem.amount);
        itemToRedeem.owner = msg.sender;
    }

    function itemNotRedeemed(uint itemId) public view returns (bool) {
        Item storage _item = items[itemId];
        return (_item.owner != address(this));
    }

    function getItemDetails(uint itemId) public view returns (Item memory) {
        require(itemId < nextItemId, "Item does not exist");
        return items[itemId];
    }
}
