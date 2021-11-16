//READ THE CurrVIT contract using require and assign it to CurrVIT variable 
const CurrVIT = artifacts.require("CurrVIT");
const CurrVITSale = artifacts.require("CurrVITSale");

//artifacts:- allows you to create a contract abstraction that 
//truffle can use to run in a js front end application env
//deploy the CurrVIT CONTRACT

module.exports = function (deployer) {
  deployer.deploy(CurrVIT,1000000).then(function(){
    //token price set at 0.001 ETH
    var tokenPrice=1000000000000000;
    deployer.deploy(CurrVITSale,CurrVIT.address,tokenPrice);
  });
};
