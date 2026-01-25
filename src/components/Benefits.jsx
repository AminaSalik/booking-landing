import React from "react";
import { ChevronRight, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import "../assets/style/Benefits.css";

const cardsData = [
  {
    title: "Real-Time Smart Agenda",
    progress: 85,
    text: "View live availability and secure your slot with a single click. Our agenda is always up-to-date, ensuring no double bookings.",
    tag: "Real-Time",
    icon: <Clock size={32} />
  },
  {
    title: "Direct WhatsApp Integration",
    progress: 75,
    text: "Have a quick question? Use our integrated WhatsApp button to chat directly with the specialist for instant peace of mind.",
    tag: "Direct",
    icon: <MessageCircle size={32} />
  },
  {
    title: "Automated Confirmation",
    progress: 90,
    text: "Every booking generates a unique digital ticket. Get automated reminders via SMS or WhatsApp so you never miss a date.",
    tag: "Automated",
    icon: <CheckCircle size={32} />
  },
];

export default function Benefits() {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="gold-text">Seamless Booking <span className="white-text">Simplified</span></h2>
          <div className="gold-underline"></div>
        </div>

        <div className="services-grid">
          {cardsData.map((card, index) => (
            <div className="service-card" key={index}>
              <div className="glass-content">
                <div className="icon-box">{card.icon}</div>
                <span className="service-tag">{card.tag}</span>
                <h3>{card.title}</h3>
                
                {/* Modern Progress Bar */}
                <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${card.progress}%` }}></div>
                </div>

                <p>{card.text}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}