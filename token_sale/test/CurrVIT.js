//TESTING THE SMART CONTRACT
//READING DOESN'T COST ANY ETH BUT WRITING DOES IN FORM OF GAS


//COMES BUNDLED WITH mocha TESTING FRAMEWORK AND chai ASSERTION LIBRARY

const CurrVIT = artifacts.require("CurrVIT");

//accounts:-All accounts from ganache
contract('CurrVIT', function(accounts){
    var tokenInstance;

    it('initializes contract with correct currency details',function(){
        return CurrVIT.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name,'CurrVIT','has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol,'CVT','has correct symbol');
            return tokenInstance.ver();
        }).then(function(ver){
            assert.equal(ver,'CurrVIT v1','has correct version')
        })
    })
    it('allocates initial supply upon deployment',function(){
        return CurrVIT.deployed().then(function(instance){
            tokenInstance=instance; //we are just keeping value of instance in tokenInstance
            //tokenInstance to be used in a promise chain
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            //chai ASSERTION LIBRARY USED TO ASSERT THAT 1M TOKENS AS TOTAL SUPPLY
            assert.equal(totalSupply.toNumber(),1000000,'sets the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
            //keep the initial supply in 1st account as 
            //an admin account i.e starting point
        }).then(function(admBal){
            assert.equal(admBal.toNumber(),1000000,"allocates initial supply to admin account")
        });
    });
})
