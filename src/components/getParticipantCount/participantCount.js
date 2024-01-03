import { useState, useEffect } from "react";
import "./participantCount.css";

import {
    getParticipantCount
} from "../../utils/contract.js";

export default function ParticipantCount({ walletAddress, setStatus }) {
    const [participantCount, setParticipantCount] = useState("..."); // New state for participant count

    const onGetParticipantsPressed = async () => {
        // check if Metamask is installed and if a wallet is connected
        if (window.ethereum && walletAddress) {
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