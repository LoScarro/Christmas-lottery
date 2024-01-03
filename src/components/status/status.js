import "./status.css";


export default function Status({ status }) {

    return (
        <section id='status' class='christmas-lottery-comp'>
             <div class="subtitle">{status}</div>
        </section>
    );
}