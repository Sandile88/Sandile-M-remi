// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SimpleBank {
    uint public balance;
    address payable public owner;  //stores the address of the owner of the contract

    constructor()  {
        owner = payable(msg.sender);  //sets the owner to the address of the user who deployed the contract
        balance = 0;
    }

    function deposit() public payable {
        require(msg.sender == owner, "Only owner can deposit funds");
        require(msg.value > 0, "Funds deposited should be greater than 0");
        balance += msg.value;
    }

    function withdraw(uint amount) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        require(amount > 0 && amount <= balance, "The withdrawal amount should be greater than 0 and less than or equal to the available balance.");
        balance -= amount;
        owner.transfer(amount); // used to transfer the withdrawn ether back to the sender
    }

    function checkBal() public view returns (uint) {
        return balance;
    }

}