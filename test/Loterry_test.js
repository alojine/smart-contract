const Lottery = artifacts.require("./Lottery.sol");

let owner = accounts[0];
let userAccount1 = accounts[1];
let userAccount2 = accounts[2];

let amount = 0.1;


contract("TestingLottery", function(accounts){

    it("it should deploy contract", async () => {
        await Lottery.deployed();
        return assert.isTrue(true);
    });

    // it("it should allow player to enter the lottery", async () => {
    //     await Lottery.
    // });
})