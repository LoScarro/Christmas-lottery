import "./status.css";


export default function Status({ status }) {

    return (
        <section id='status' class='christams-lottery-comp'>
             <div class="subtitle">{status}</div>
        </section>
    );
}