import "../assets/css/hero.css";
import Benefits from "./Benefits";
import Cta from "./CTA";
import "../assets/css/Landing.css";



function Hero() {
  return (
    <section className="vh-100 d-flex align-items-center hero ">
      <div className="container text-center">
        <div className="page">
          <div className="card">
            <div className="header">
              <h1 className="text-white">GET MORE APPOINTMENTS</h1>
              <p className="text-white">Turn visitors into real clients.</p>
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
