import React, { useEffect } from "react"
import "../assets/style/Navbar.css"
import  Booking from "../assets/img/Booking.png"

import {
  ParticleSystem,
  OrbController,
  BackgroundController,
  ButtonController,
} from "../utils/animations"

export default function Navbar() {
  useEffect(() => {
    // run after DOM is mounted
    const particleSystem = new ParticleSystem()
    const orb = new OrbController()
    const background = new BackgroundController()
    const buttons = new ButtonController()

    // cleanup when component unmounts (important)
    return () => {
      // optional if you later add removeEventListener
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-bg" />
        <div className="particles-container" id="particles" />
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
          <div className="shape shape-4" />
          <div className="shape shape-5" />
          <div className="shape shape-6" />
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Book Appointments Faster</span>
            <span className="title-line">Grow Your Business</span>
          </h1>

          <p className="hero-description">
          A simple and elegant appointment booking page designed to turn visitors into real clients. Fast, mobile-friendly, and built to help you manage bookings effortlessly
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>

       <div className="hero-visual">
  <div className="hero-image-wrapper" id="centralOrb">
    <img
      src={Booking}
      alt="Hero Visual"
      className="hero-image"
    />
  </div>
</div>

      </div>

      <div className="scroll-indicator">
        <div className="scroll-arrow" />
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
