import { useState } from "react";

import {
    getParticipantCount
} from "../../utils/contract.js";

export default function ParticipantCount({ walletAddress, setStatus }) {
    const [participantCount, setParticipantCount] = useState(0); // New state for participant count

    const onGetParticipantsPressed = async () => {
        if (!window.ethereum || !walletAddress) {
            setStatus("💡 Connect your Metamask wallet to update the message on the blockchain.")
        } else {
            const count = await getParticipantCount(walletAddress);
            setParticipantCount(count);
        }

    };

    return (
        <div id="container">
            <div>
                <p>Number of participants: {participantCount}</p>
                <button onClick={onGetParticipantsPressed}>
                    Get Participant Count
                </button>
            </div>
        </div>
    )
}