// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract Lottery {
    address public owner;
    address payable[] public players;
    uint public lotteryId;
    mapping (uint => address payable) public lotteryHistory; 

    // Owner initial sender
    constructor() {
        owner = msg.sender;
        lotteryId = 1;
    }

    // Checking for player amount
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }

    // Get random number
    function getRandom() public view returns (uint) {
        // keccak256 hashing algorithm
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    // Pick winner
    function pickWinner() public onlyOwner{
        uint i = getRandom() % players.length;
        players[i].transfer(address(this).balance);

        // Increase lottery history and round
        lotteryHistory[lotteryId] = players[i];
        lotteryId++;

        // new round array
        players = new address payable[](0);
    }


    // Get winner at lottery
    function getWinnerByLottery(uint idOfLottery) public view returns (address payable) {
        return lotteryHistory[idOfLottery];
    }

    // Get balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Get players
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

}