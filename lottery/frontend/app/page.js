"use client"

import lottery from "./contract/Lottery.json";
import { useState } from "react";
import Web3 from 'web3';

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState(0);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install Metamask to use this app.");
      return;
    } else {
      console.error('Web3 not found');
    }

    try {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.requestAccounts();
        setAccounts(accounts);

        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = lottery.networks[networkId];
        const instance = new web3Instance.eth.Contract(
          lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setContract(instance);

        const balance = await instance.methods.getVendingMachineBalance().call();
        setBalance(balance);
      } catch (error) {
        console.error(error);
      }
    
  };


  return (
    <div>
    <h1>Lottery App</h1>
    {web3 ? (
      <div>
        <p>Connected: {accounts[0]}</p>
      </div>
    ) : (
      <button onClick={connectWallet}>Connect Wallet</button>
    )}
  </div>
  );
}
