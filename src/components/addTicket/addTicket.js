import { useState } from "react";
import {
    addTicket
} from "../../utils/contract.js";

export default function AddTicketForm({ walletAddress, setStatus }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [studentID, setStudentID] = useState('');
    const [number, setNumber] = useState('');

    const onAddTicketSubmit = async (e) => {
        e.preventDefault();
        const { status } = await addTicket(firstname, lastname, studentID, number, walletAddress);
        setStatus(status);
    };

    return (
        <div id="container">
            <form onSubmit={onAddTicketSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </label>

                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </label>

                <label>
                    Student ID:
                    <input
                        type="text"
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                    />
                </label>

                <label>
                    Ticket Number:
                    <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </label>

                <button type="submit">Add Ticket</button>
            </form>
        </div>
    );
}