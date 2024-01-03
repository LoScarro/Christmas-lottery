import { useState } from "react";
import "./addTicket.css";
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
        if (firstname === '' || lastname === '' || studentID === '' || number === '') {
            setStatus("⚠️ Please fill out all fields");
            return;
        }
        const { status } = await addTicket(firstname, lastname, studentID, number, walletAddress);
        setStatus(status);
    };

    return (
        <section id='addTicket' class='christmas-lottery-comp'>
            <form onSubmit={onAddTicketSubmit}>
                <div class="title">Welcome</div>
                <div class="subtitle">Buy a ticket!</div>
                <div class="input-container ic1">
                    <input id="firstname" class="input" type="text" required placeholder=" " value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    <div class="cut"></div>
                    <label for="firstname" class="placeholder">First name</label>
                </div>
                <div class="input-container ic2">
                    <input id="lastname" class="input" type="text" required placeholder=" " value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    <div class="cut"></div>
                    <label for="lastname" class="placeholder">Last name</label>
                </div>
                <div class="input-container ic2">
                    <input id="studentId" class="input" type="text" required placeholder=" " value={studentID} onChange={(e) => setStudentID(e.target.value)} />
                    <div class="cut"></div>
                    <label for="studentId" class="placeholder">studentID</label>
                </div>
                <div class="input-container ic2">
                    <input id="number" class="input" type="number" required placeholder=" " value={number} onChange={(e) => setNumber(e.target.value)} />
                    <div class="cut cut-long"></div>
                    <label for="number" class="placeholder">Number of tickets</label>
                </div>
                <button type="text" class="submit">submit</button>
            </form>
        </section>
    );
}