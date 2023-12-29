import React from "react";
import { useEffect, useState } from "react";
import AddTicketForm from "./components/addTicket/addTicket";
import ParticipantCount from "./components/getParticipantCount/participantCount";
import DrawTicket from "./components/drawTicket/drawTicket";

import {
  connectWallet,
  getCurrentWalletConnected
} from "./utils/wallet.js";

import {
  christmas_lottery_contract
} from "./utils/contract.js";

function SmartContractForm() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function getConnectedWallet() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    addSmartContractListener();

    getConnectedWallet();
    addWalletListener();
  }, []);

  // listener for events in the smart contract
  function addSmartContractListener() {
    christmas_lottery_contract.events.WinnerDrawn({}, (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        console.log("The winner is...");
        // event WinnerDrawn(string  _firstname, string _lastname, string indexed _studentID);
        // get the winner's _lastname
        setStatus(data.returnValues[1]);
      }
    });
  }

  // lister for changes in the wallet connection
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("🤞🏻 Good Luck!");
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

      <AddTicketForm
        walletAddress={walletAddress}
        setStatus={setStatus}
      />

      <ParticipantCount
        walletAddress={walletAddress}
        setStatus={setStatus}
      />
      
      <DrawTicket
        walletAddress={walletAddress}
        setStatus={setStatus}
      />

      <p id="status">{status}</p>

    </div>
  );
}

export default SmartContractForm;