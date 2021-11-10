//TESTING THE SMART CONTRACT
//READING DOESN'T COST ANY ETH BUT WRITING DOES IN FORM OF GAS


//COMES BUNDLED WITH mocha TESTING FRAMEWORK AND chai ASSERTION LIBRARY

const CurrVIT = artifacts.require("CurrVIT");

contract('CurrVIT', function(accounts){
    it('sets the total supply upon deployment',function(){
        return CurrVIT.deployed().then(function(instance){
            tokenInstance=instance; //we are just keeping value of instance in tokenInstance
            //tokenInstance to be used in a promise chain
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),1000000,'sets the total supply to 1,000,000');
        });
    });
})