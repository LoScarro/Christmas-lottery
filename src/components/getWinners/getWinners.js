import { useState } from "react";
import "./getWinners.css";
import {
    getWinners
} from "../../utils/contract.js";

export default function Winners({ walletAddress, setStatus }) {
    const [winners, setWinners] = useState([]);

    const onGetWinnersPressed = async () => {
        // Check if Metamask is installed and if a wallet is connected
        if (window.ethereum && walletAddress) {
            try {
                const users = await getWinners(walletAddress);
                setWinners(users);
            } catch (error) {
                console.error("Error getting winners:", error);
            }
        }
    };

    return (
        <section id='winners' class='christmas-lottery-comp'>
            <div class="subtitle"> Winners:
                {winners.map((winner, index) => (
                    <div key={index}>
                        <p>Name: {winner.firstname} </p>
                        <p>Surname: {winner.lastname}</p>
                        <p>Student ID: {winner.studentID}</p>
                        <hr />
                    </div>
                ))}
            </div>
            <button type="text" class="submit" onClick={onGetWinnersPressed}>
                Get Winners
            </button>
        </section>
    );
}