// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;  //version of solidity 

import "./CurrVIT.sol";

contract CurrVITSale {
    address payable admin;
    CurrVIT public tokenContract;  //for giving address of CurrVIT
    uint256 public tokenPrice;     // unsigned integer
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);  //keep track of buyer and amount

    constructor (CurrVIT _tokenContract, uint256 _tokenPrice) public {
        admin=msg.sender;     //for deploying the contract
        tokenContract = _tokenContract;  // assigning value and used for buying tokens later
        tokenPrice = _tokenPrice;        // keep track of token price
    }

    function multiply(uint x, uint y) internal pure returns (uint z) {    //inbuilt library to multiply using ds-math and is a pure function
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {  // payable so someone can send ether
        require(msg.value == multiply(_numberOfTokens, tokenPrice));  //checks whether no. of tokens admin gave is equal to tokens bought by investor
        require(tokenContract.balanceOf((this)) >= _numberOfTokens); //To check there are enough token owned by smart contract
        require(tokenContract.transfer(msg.sender, _numberOfTokens)); /*sending tokens to the buyer and number of tokens he bought 
                                                                      ie to check whether transfer is successfull*/
                                                                       
        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);  //trigger the sell event and help in selling the token
    }

    function endSale() public {
        require(admin==msg.sender);  //He will end the sale
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this)))); //Transfer the remaining token to the admin

        admin.transfer(address(this).balance); //destroy the contract
    }
}