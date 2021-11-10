// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//ALL FN AND VAR NAMES ARE AS PER ERC 20 STD.  
contract CurrVIT{
    //Name
    string public name='CurrVIT';
    //Symbol
    string public symbol='CVT';
    //Constuctor: Initializer
    string public ver='CurrVIT v1';
    //Read total no. of tokens

    //totalSupply is a state variable accessible to all
    //Set tokens
    uint256 public totalSupply; //Declared VAR NAME NOT TO BE CHOSEN ARBITRARILY 

    //local variables in Solidity start with '_'
    constructor(uint256 _inittotalSupply) public{  
         //made public so as to run as when the contract tis deployed
         balanceOf[msg.sender]=_inittotalSupply;
         totalSupply= _inittotalSupply;
    }

    mapping(address=>uint256) public balanceOf;
}

