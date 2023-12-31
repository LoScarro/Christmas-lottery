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
import { christmas_lottery_contract } from "./utils/contract.js";



function App() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // event listener for changes in the smart contract
    addSmartContractListener();
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