const Lottery = artifacts.require("./Lottery.sol");

contract("TestingLottery", function(accounts){

    it("is true", async function() {
        await Lottery.deployed();
        return assert.isTrue(true);
    });
})