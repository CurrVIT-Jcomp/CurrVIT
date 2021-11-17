// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

//ALL FN AND VAR NAMES ARE AS PER ERC 20 STD.  
contract CurrVIT{
    //Name
    string public name='CurrVIT';
    //Symbol
    string public symbol='CVIT';
    //Constuctor: Initializer
    string public ver='CurrVIT v1';
    //Read total no. of tokens

    //totalSupply is a state variable accessible to all
    //Set tokens
    uint256 public totalSupply; //Declared VAR NAME NOT TO BE CHOSEN ARBITRARILY 
    
    mapping(address=>uint256) public balanceOf;
    //local variables in Solidity start with '_'
    constructor(uint256 _inittotalSupply) public{  
         //made public so as to run as when the contract is deployed
         balanceOf[msg.sender]=_inittotalSupply;
         totalSupply= _inittotalSupply;
    }

    //Accounts and its balance stored as key:value pairs
    

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
    requirement of account owner(sender not initiating the transfer)
    fns:
      1 TransferFrom 
      2 approve transfer
      3 transfer
    */  
    
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
   
}

