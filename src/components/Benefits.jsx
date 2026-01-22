import React, { useRef } from "react";
import "../assets/style/Benefits.css";

const cardsData = [
  {
    title: "Real-Time Smart Agenda",
    progress: 85,
    text: "View live availability and secure your slot with a single click. Our agenda is always up-to-date, ensuring no double bookings.",
  },
  {
    title: "Direct WhatsApp Integration",
    progress: 75,
    text: "Have a quick question? Use our integrated WhatsApp button to chat directly with the specialist for instant peace of mind.",
  },
  {
    title: "Automated Confirmation",
    progress: 90,
    text: "Every booking generates a unique digital ticket. Get automated reminders via SMS or WhatsApp so you never miss a date.",
  },
];

export default function Benefits() {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = -(x - centerX) / 25;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (card) card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section className="benefits-section">
      <div className="px-8 py-20 max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Seamless Booking, <span className="text-gold">Simplified for You</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Experience the future of appointment management with real-time updates and direct communication.
          </p>
        </header>

        <div className="benefits-grid">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="glass-card-wrapper"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="glass-card" ref={(el) => (cardRefs.current[index] = el)}>
                <div className="glass-card-content">
                  <h2 className="text-gold">{card.title}</h2>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${card.progress}%` }}></div>
                  </div>
                  <p>{card.text}</p>
                  <button className="benefit-btn">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}