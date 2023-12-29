import React from "react";
import { useEffect, useState } from "react";
import {
  getParticipantsCount,
  addTicket
} from "./utils/contract.js";
import {
  connectWallet,
  getCurrentWalletConnected
} from "./utils/wallet.js";

function SmartContractForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [studentID, setStudentID] = useState('');
  const [number, setNumber] = useState('');
  const [participantsCount, setParticipantsCount] = useState(0); // New state for participants count

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function getConnectedWallet() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    getConnectedWallet();
    addWalletListener();
    
  }, []);

  // lister for changes in the wallet connection
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Good Luck! 🤞🏻");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTicket(firstname, lastname, studentID, number, walletAddress);
  };

  const fetchParticipantsCount = async () => {
    const count = await getParticipantsCount(walletAddress);
    setParticipantsCount(count);
  };

  const formatWalletAddress = (address) => {
    return "Connected: " +
      String(address).substring(0, 6) +
      "..." +
      String(address).substring(38);
  }

  const handleWalletConnection = async () => {
    const { status, address } = await connectWallet();
    setStatus(status);
    setWallet(address);
  };

  return (
    <div id="container">

      <button id="walletButton" onClick={handleWalletConnection}>
        {walletAddress.length > 0 ? formatWalletAddress(walletAddress) : <span>Connect Wallet</span>}
      </button>

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>

        <label>
          Student ID:
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
        </label>

        <label>
          Ticket Number:
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>

        <button type="submit">Add Ticket</button>
      </form>

      <div>
        <p>Participants Count: {participantsCount}</p>
        <button onClick={fetchParticipantsCount}>
          Get Participants Count
        </button>
      </div>

      <p id="status">{status}</p>

    </div>
  );
}

export default SmartContractForm;