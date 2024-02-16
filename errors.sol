// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    address public auctioneer;
    address public highestBidder;
    uint256 public highestBid;

    enum AuctionState { Open, Closed }
    AuctionState public auctionState;

    modifier onlyAuctioneer() {
        require(msg.sender == auctioneer, "Only the auctioneer can call this function");
        _;
    }

    modifier auctionOpen() {
        assert(auctionState == AuctionState.Open);
        _;
    }

    constructor() {
        auctioneer = msg.sender;
        auctionState = AuctionState.Open;
    }

    function placeBid() external payable auctionOpen {
        if (msg.value <= highestBid) {
            revert("Bid must be higher than the current highest bid");
        }

        if (highestBidder != address(0)) {
            // Refund the previous highest bidder
            payable(highestBidder).transfer(highestBid);
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function endAuction() external onlyAuctioneer auctionOpen {
        // Close the auction and transfer funds to the auctioneer
        auctionState = AuctionState.Closed;
        payable(auctioneer).transfer(highestBid);
    }

    function cancelAuction() external onlyAuctioneer auctionOpen {
        // Cancel the auction, refund the highest bidder
        auctionState = AuctionState.Closed;
        payable(highestBidder).transfer(highestBid);
    }

}
