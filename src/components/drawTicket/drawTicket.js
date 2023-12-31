import { useState } from "react";
import "./drawTicket.css";
import {
    drawTicket
} from "../../utils/contract.js";

export default function DrawTicket({ walletAddress, setStatus }) {
    const [number, setNumber] = useState('');

    const onDrawTicketSubmit = async (e) => {
        e.preventDefault();
        const { status } = await drawTicket(number, walletAddress);
        setStatus(status);
    };

    return (
        <section id='drawTicket'>
            <form onSubmit={onDrawTicketSubmit}>
            <div class="title">Draw a winner!</div>
                <div class="input-container ic1">
                    <input id="winners number" class="input" type="number" placeholder=" " value={number} onChange={(e) => setNumber(e.target.value)} />
                    <div class="cut"></div>
                    <label for="number" class="placeholder">How many winners?</label>
                </div>
                <button type="text" class="submit">Draw Winner</button>
            </form>
        </section>
    );
}