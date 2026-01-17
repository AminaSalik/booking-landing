import React, { useEffect, useState } from "react";
import "../assets/style/Navbar.css";
import Booking from "../assets/img/Booking.png";
import { Link } from 'react-router-dom';
import { ParticleSystem, OrbController, BackgroundController, ButtonController } from "../utils/animations";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const particleSystem = new ParticleSystem();
    const orb = new OrbController();
    const background = new BackgroundController();
    const buttons = new ButtonController();
    return () => {};
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">GLOW<span>APP</span></div>
          
          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
    {/* 2. تغيير وسم a إلى Link وتغيير href إلى to */}
    <Link 
        to="/admin" 
        className="admin-link" 
        onClick={() => setIsMenuOpen(false)}
    >
        Login
    </Link>
    
    <button className="btn nav-btn">Booking Now</button>
</div>

          <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
            <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="gradient-bg" />
          <div className="particles-container" id="particles" />
          <div className="floating-shapes">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`shape shape-${i}`} />
            ))}
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="title-line">Book Appointments Faster</span>
              <span className="title-line">Grow Your Business</span>
            </h1>
            <p className="hero-description">
              A simple and elegant appointment booking page designed to turn visitors into real clients.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Booking Now</button>
              <button className="btn btn-secondary">Admin Panel</button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper" id="centralOrb">
              <img src={Booking} alt="Hero Visual" className="hero-image" />
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-arrow" />
          <span>Scroll to explore</span>
        </div>
      </section>
    </>
  );
}