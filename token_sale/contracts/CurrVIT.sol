// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//ALL FN AND VAR NAMES ARE AS PER ERC 20 STD.  
contract CurrVIT{
    //Constuctor: Initializer
    
    //Read total no. of tokens

    //totalSupply is a state variable accessible to all
    //Set tokens
    uint256 public totalSupply; //Declared VAR NAME NOT TO BE CHOSEN ARBITRARILY 

    constructor() public{  
         //made public so as to run as when the contract tis deployed
         totalSupply= 1000000;
         

     }


}
