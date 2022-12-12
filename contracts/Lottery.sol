// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract Lottery{

    address public owner;
    address[] public players;
    string public description;
    uint public amount = 0.1 ether; 


    function lottery() public {
        owner = msg.sender;
    }

    function enter() public payable{
        require(msg.value > amount);
        players.push(msg.sender);
    }

    function getRandom() private view returns(uint){
        return uint (keccak256(abi.encode(block.timestamp, players)));
    }

    function getWinner() public isOwner{
        uint index = getRandom() % players.length;
        payable (players[index]).transfer(address(this).balance);
        players = new address[](0);
    }

    modifier isOwner(){
        require(msg.sender == owner);
        _;
    }

}