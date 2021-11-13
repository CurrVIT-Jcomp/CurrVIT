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
         //made public so as to run as when the contract is deployed
         balanceOf[msg.sender]=_inittotalSupply;
         totalSupply= _inittotalSupply;
    }

    //Accounts and its balance stored as key:value pairs
    mapping(address=>uint256) public balanceOf;

    //Transfer fn
    //return bool

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    
    function transfer(address _to,uint256 _value) public returns(bool success){
        //If sender account bal>value to be sent,
        //continue with execution oflines below
        //if false,then stop execution and return any gas used 
        require(balanceOf[msg.sender]>=_value);
        //transfer the balance
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;

        //Transfer event
        emit Transfer(msg.sender,_to,_value);
        return true;
    }

    /*delegated transfer: Transfer from one acc to another without 
    requirement of account owner
    fns:
      1 approve transfer
      2 transfer
    */


    
}

