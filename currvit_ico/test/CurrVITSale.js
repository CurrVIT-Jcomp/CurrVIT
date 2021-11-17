const CurrVIT = artifacts.require("CurrVIT");
const CurrVITSale = artifacts.require("CurrVITSale");

contract('CurrVITSale', function (accounts) {
    var tokenInstance;
    var tokenSaleInstance;
    var admin = accounts[0];
    var buyer = accounts[1];
    var tokenPrice = 1000000000000000; // in wei
    var tokensAvailable = 750000;
    var numberOfTokens;

    it('initializes the contract with the correct values', function () {
        return CurrVITSale.deployed().then(function (instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then(function (address) {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then(function (address) {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).then(function (price) {
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });
});
