import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home() {
  return (
    <>
      <section className="heading">
        <h1>Why are you here?</h1>
        <p>Please enter your reason below</p>
      </section>

      <Link to="/new-reminder" className=" btn btn-reverse btn-block">
        <FaQuestionCircle /> Create New Reminder
      </Link>
      <Link to="/reminder" className=" btn btn-block">
        <FaTicketAlt /> Reminders
      </Link>
    </>
  );
}

export default Home;
