import { useState, useEffect } from "react";
import "./participantCount.css";

import {
    getParticipantCount
} from "../../utils/contract.js";

export default function ParticipantCount({ walletAddress, setStatus }) {
    const [participantCount, setParticipantCount] = useState(0); // New state for participant count

    const onGetParticipantsPressed = async () => {
        // if Metamask is not installed or if a wallet is not connected suggest to connect the wallet
        if (!window.ethereum || !walletAddress) {
            setStatus("💡 Connect your Metamask wallet to play with the lottery.")
        } else {
            const count = await getParticipantCount(walletAddress);
            setParticipantCount(count);
        }

    };

    useEffect(() => {
        onGetParticipantsPressed();
    }, [onGetParticipantsPressed]);

    return (
        <section id='participantCount' class='christmas-lottery-comp'>
            <div class="subtitle">Number of participants: {participantCount}</div>
        </section>
    )
}