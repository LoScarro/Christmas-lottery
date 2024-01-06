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
import { christmas_lottery_contract, checkIsOwner } from "./utils/contract.js";

function App() {
  // wallet address of the connected wallet
  const [walletAddress, setWallet] = useState("");
  // message for the user
  const [status, setStatus] = useState("...");
  // enable features only for the owner
  const [isOwner, setIsOwner] = useState(false);

  // check if the connected wallet belongs to the owner
  const isUserOwner = async () => {
    // check if Metamask is installed and if a wallet is connected
    if (window.ethereum && walletAddress) {
      const {owner, status} = await checkIsOwner(walletAddress);
      setIsOwner(owner);
      setStatus(status);
    }
  };

  useEffect(() => {
    // event listener for changes in the smart contract
    addSmartContractListener();
    // check if the connected wallet belongs to the owner
    isUserOwner();
  }, [walletAddress]);


  // TODO: listener for events in the smart contract
  function addSmartContractListener() {
    christmas_lottery_contract.events.WinnerDrawn({ fromBlock: 'latest' }, (error, event) => {
      if (!error) {
        console.log('WinnerDrawn event:', event.returnValues);
        // Handle the event data here
      } else {
        console.error('Error:', error);
      }
    });
  }

  let ownerComponents = null;

  if (isOwner) {
    // Render components that are visible only to the owner
    ownerComponents = (
      <>
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
      </>
    );
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

      {ownerComponents}

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