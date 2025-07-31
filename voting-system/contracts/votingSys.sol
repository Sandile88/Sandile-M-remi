// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}

contract VotingSystem is Ownable {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping (uint => Candidate) public candidates;
    mapping (address => bool) public voters;

    uint public candidateCount = 0;


    function addCandidate(string calldata _name) public onlyOwner {
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
        candidateCount++;
    }

    function vote(uint candidateId) public {
        require(!voters[msg.sender], "You have already voted");
        require(candidateId < candidateCount, "Candidate id not found!");
        candidates[candidateId].voteCount++;
        voters[msg.sender] = true;
    }

    function getCandidate(uint candidateId) public view returns (string memory name, uint voteCount) {
    Candidate memory c = candidates[candidateId];
    return (c.name, c.voteCount);
    }

    function getTotalCandidates() public view returns (uint) {
        return candidateCount;
    }  
}