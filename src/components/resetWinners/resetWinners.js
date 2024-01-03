import "./resetWinners.css";
import {
    resetWinners
} from "../../utils/contract.js";

export default function ResetWinners({ walletAddress, setStatus }) {

    const onResetWinnersSubmit = async (e) => {
        e.preventDefault();
        const { status } = await resetWinners(walletAddress);
        setStatus(status);

    };

    return (
        <section id='resetWinners' class='christmas-lottery-comp'>
            <button type="text" class="submit" onClick={onResetWinnersSubmit}>
                Reset Winners
            </button>
        </section>
    );
}