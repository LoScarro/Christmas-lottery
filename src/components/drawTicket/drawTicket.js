import { useState } from "react";
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
        <div id="container">
            <form onSubmit={onDrawTicketSubmit}>
                <label>
                    Number:
                    <input
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </label>
                <button type="submit">Draw Winner</button>
            </form>
        </div>
    );
}