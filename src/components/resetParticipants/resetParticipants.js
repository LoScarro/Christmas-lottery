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
        <div id="container">
            <button onClick={onResetParticipantsSubmit}>
                Reset Participants
            </button>
        </div>
    );
}