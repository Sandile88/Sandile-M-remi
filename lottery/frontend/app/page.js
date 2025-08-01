"use client"

import lottery from "./contract/Lottery.json";
import { useState } from "react";
import Web3 from 'web3';

const CONTRACT_ADDRESS = "0x8958f1faD7A69dF00bAFFA013Dc3f88caAFCd188";

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);
  const [players, setPlayers] = useState([]);




  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install Metamask to use this app.");
      return;
    }

    try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);


        // const networkId = await web3Instance.eth.net.getId();
        // const deployedNetwork = lottery.networks[networkId];
        // if (!deployedNetwork) {
        //   console.error("Contract not deployed on this network");
        //   return;
        // }
        // const instance = new web3Instance.eth.Contract(
        //   lottery.abi,
        //   deployedNetwork && deployedNetwork.address
        // );

        const instance = new web3Instance.eth.Contract(lottery.abi, CONTRACT_ADDRESS);
        setContract(instance);

        console.log("instance", instance);

        const playersList = await instance.methods.getPlayers().call();
        setPlayers(playersList);

        const balance = await instance.methods.getBalance().call();
        setBalance(balance);
      } catch (error) {
        console.error(error);
      }
    
  };

  const getAllPlayers = async () => {
    try {
      const players = await contract.methods.getPlayers().call();
      setPlayers(players);
    } catch (error) {
      console.error(error);
    }
  };

  const enterPlayer = async () => {
    console.log("web3:", web3);
    console.log("contract:", contract);
    console.log("accounts:", accounts);

    if (!contract || !web3 || accounts.length === 0) {
    alert("Please connect your wallet first.");
    return;
    }

    try {
      await contract.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei("0.00002", "ether"),
      });
      getAllPlayers();
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
    <h1>Lottery App</h1>
    {web3 ? (
      <div>
        <p>Connected: {accounts[0]}</p>
        <p>Balance: {web3 && web3.utils.fromWei(balance, "ether")} ETH</p>

        <p>Number of Players: {players.length}</p>
        <button onClick={getAllPlayers}>Get all Players</button><br/>
        <button onClick={enterPlayer}>Enter Lottery</button>
      </div>
    ) : (
      <button onClick={connectWallet}>Connect Wallet</button>
    )}
  </div>
  );
}
