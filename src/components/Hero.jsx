import "../assets/css/hero.css";
import Benefits from "./Benefits";
import Cta from "./CTA";
import "../assets/css/Landing.css";
import { FaRegCalendarAlt } from "react-icons/fa";


function Hero() {
  return (
    <section className="vh-100 d-flex align-items-center hero ">
      <div className="container text-center">
        <div className="page">
          <div className="card">
            <div className="header">
              {/* <div className="icon calendar">
                <FaRegCalendarAlt className="calenderEcon" />
              </div> */}
              <h1>GET MORE APPOINTMENTS</h1>
              <p>Turn visitors into real clients.</p>
            </div>

            <Benefits />

            <Cta />

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
