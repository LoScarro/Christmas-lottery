import "./resetParticipants.css";
import {
    resetParticipants
} from "../../utils/contract.js";

export default function ResetParticipants({ walletAddress, setStatus }) {

    const onResetParticipantsSubmit = async (e) => {
        e.preventDefault();
        const { status } = await resetParticipants(walletAddress);
        setStatus(status);

    };

    return (
        <section id='resetParticipants' class='christmas-lottery-comp'>
            <button type="text" class="submit" onClick={onResetParticipantsSubmit}>
                Reset Participants
            </button>
        </section>
    );
}