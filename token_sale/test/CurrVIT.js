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
        });
    });

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

    it('transfers token from one acc to another',function(){
        return CurrVIT.deployed().then(function(instance){
            tokenInstance=instance;
            //Testing 'require' statement by transfer of 
            //something larger than sender's bal(account[0] has 1M)
            //and raise an exception if happens so
            //call() doesn't trigger a transaction,
            //but returns the value,so we use it to inspect the return value
            //it calls the function without writing to the blockchain
            return tokenInstance.transfer.call(accounts[1],99999999999); 
        }).then(assert.fail).catch(function(error){ 
            assert(error.message,'error message contains revert');
            return tokenInstance.transfer.call(accounts[1],250,{from: accounts[0]});
        }).then(function(success){
            assert.equal(success,true,'success returns true');
            //this triggers a transaction
            return tokenInstance.transfer(accounts[1],250,{from: accounts[0]});
        }).then(function(receipt){
            //RECEIPT
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 250, 'logs the transfer amount');
            
            //check for balance
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(bal){
            //check in receivers side
            assert.equal(bal.toNumber(),250,'adds the amt to receiver acc');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(bal){
            //check in senders side
            assert.equal(bal.toNumber(),999750,'deducts the amt from sender acc');
        }); 
    });
})