// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;

contract Migrations{

    address public owner;
    uint256 public last_completed_migration;


    modifier restricted(){
        require(msg.sender == owner, "Contract Owner Only");
        _;
    }

    function setCompleted(uint comp) public restricted {
        last_completed_migration = comp;
    }
}