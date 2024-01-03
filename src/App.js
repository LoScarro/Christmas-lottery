import { React, useEffect, useState } from "react";

// import components
import AddTicketForm from "./components/addTicket/addTicket";
import ParticipantCount from "./components/getParticipantCount/participantCount";
import DrawTicket from "./components/drawTicket/drawTicket";
import ResetWinners from "./components/resetWinners/resetWinners";
import ResetParticipants from "./components/resetParticipants/resetParticipants";
import Winners from "./components/getWinners/getWinners";
// manage all the login related to the wallet connection
import Wallet from "./components/walletConnection/walletConnection";
// contains the messages for the user
import Status from "./components/status/status.js";

// import utils
import { christmas_lottery_contract, isOwner } from "./utils/contract.js";



function App() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [isOwner, setIsOwner] = useState(0); // New state for participant count

  const checkIsOwner = async () => {
    if (!window.ethereum || !walletAddress) {
      setStatus("💡 Connect your Metamask wallet to update the message on the blockchain.")
    } else {
      const owner = await isOwner(walletAddress);
      setIsOwner(owner);
    }
  };

  useEffect(() => {
    // event listener for changes in the smart contract
    addSmartContractListener();
    checkIsOwner();
  }, []);

  // TODO: listener for events in the smart contract
  function addSmartContractListener() {
    christmas_lottery_contract.events.WinnerDrawn({}, (error, data) => {
      if (error) {
        setStatus("😥 " + error.message);
      } else {
        setStatus(data.returnValues[1]);
        console.log(data.returnValues[1]);
      }
    });
  }

  if(isOwner) {
    
  }

  return (
    <>
      <div class="top-bar">
        <ParticipantCount
          walletAddress={walletAddress}
          setStatus={setStatus}
        />

        <Wallet
          walletAddress={walletAddress}
          setStatus={setStatus}
          setWallet={setWallet}
        />

      </div>

      <AddTicketForm
        walletAddress={walletAddress}
        setStatus={setStatus}
      />

      <DrawTicket
        walletAddress={walletAddress}
        setStatus={setStatus}
      />

      <div class="reset-buttons">

        <ResetWinners
          walletAddress={walletAddress}
          setStatus={setStatus}
        />

        <ResetParticipants
          walletAddress={walletAddress}
          setStatus={setStatus}
        />

      </div>

      <Winners
        walletAddress={walletAddress}
        setStatus={setStatus}
      />

      <Status
        status={status}
      />
    </>
  );
}

export default App;