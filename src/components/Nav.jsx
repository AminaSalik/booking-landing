import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <span className="navbar-brand fw-bold">BookingPage</span>
        <a href="#booking" className="btn btn-primary">
          Book Now
        </a>
      </div>
    </nav>
  );
}

export default Nav;
