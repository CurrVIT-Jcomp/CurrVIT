//READ THE CurrVIT contract using require and assign it to CurrVIT variable 
const CurrVIT = artifacts.require("CurrVIT");


//artifacts:- allows you to create a contract abstraction that 
//truffle can use to run in a js front end application env
//deploy the CurrVIT CONTRACT

module.exports = function (deployer) {
  deployer.deploy(CurrVIT);
};
