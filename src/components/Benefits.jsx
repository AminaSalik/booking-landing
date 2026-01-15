import React, { useRef } from "react";
import "../assets/style/Benefits.css";

const cardsData = [
  {
    title: "Real-Time Smart Agenda",
    progress: 85,
    text: "View live availability and secure your slot with a single click. Our agenda is always up-to-date, ensuring no double bookings and zero wait times",
  },
  {
    title: "Direct WhatsApp Integration",
    progress: 75,
    text: "One-Click WhatsApp Support Description: Have a quick question before you book? Use our integrated WhatsApp button to chat directly with the specialist or their support team for instant peace of mind.",

  },
  {
    title: "Automated Confirmation",
    progress: 90,
    text: "Every booking generates a unique digital ticket sent straight to your phone. Get automated reminders via SMS or WhatsApp so you never miss an important date.",

  },
];

export default function Benefits() {
  // We'll store refs for each card
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    card.style.transform = "none";
  };

  const handleButtonClick = (e) => {
    const button = e.currentTarget;
    button.style.transform = "scale(0.95)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
    }, 200);
  };

  return (

    <>
      <div className="px-8 py-20">
        <header className="booking-header ">
          <h2 className=" w-full text-3xl  text-center sm:text-4xl md:text-5xl text-white"> Seamless Booking, Simplified for You</h2>
          <p className="w-full py-8 mx-auto -mt-2 text-lg text-center text-white intro sm:max-w-3xl">Our live agenda provides instant access to available slots. Experience the future of appointment management with real-time updates and direct communication."</p>
        </header>
        <div className="hero_">
          <div className="container">
            {cardsData.map((card, index) => (
              <div
                key={index}
                className="card"
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <h2>{card.title}</h2>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
