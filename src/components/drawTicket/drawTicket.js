import { useState } from "react";
import "./drawTicket.css";
import {
    drawTicket, getWinners, getParticipantCount
} from "../../utils/contract.js";

export default function DrawTicket({ walletAddress, setStatus }) {
    const [number, setNumber] = useState('');

    const onDrawTicketSubmit = async (e) => {
        e.preventDefault();
        if (number === '') {
            setStatus("⚠️ Please insert a number of players to draw");
            return;
        } 
        const { winners } = await getWinners(walletAddress);
        const { count } = await getParticipantCount(walletAddress);
        // if the user tries to draw more tickets than the number of possible winners
        if(number > count - winners.length) {
            setStatus("⚠️ There are no more players to draw or you are trying to draw too many players");
            return;
        }
        const { status } = await drawTicket(number, walletAddress);
        setStatus(status);
    };

    return (
        <section id='drawTicket' class='christmas-lottery-comp'>
            <form onSubmit={onDrawTicketSubmit}>
            <div class="title">Draw some winners!</div>
                <div class="input-container ic1">
                    <input id="winners number" class="input" type="number" required placeholder=" " value={number} onChange={(e) => setNumber(Math.max(0,e.target.value))} />
                    <div class="cut"></div>
                    <label for="number" class="placeholder">How many winners?</label>
                </div>
                <button type="text" class="submit">Draw Winner</button>
            </form>
        </section>
    );
}