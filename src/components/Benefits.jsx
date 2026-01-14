import React, { useRef } from "react";
import "../assets/style/Benefits.css";

const cardsData = [
  {
    title: "Creative Design",
    progress: 85,
    text: "Explore innovative design solutions with our cutting-edge approach to modern UI/UX development.",
  },
  {
    title: "Smart Features",
    progress: 75,
    text: "Implement intelligent features that enhance user experience and streamline interactions.",
  
  },
  {
    title: "Modern Solutions",
    progress: 90,
    text: "Leverage the latest technologies to create seamless and responsive user interfaces.",

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
               <header className="booking-header">
               <h2 className="w-full text-3xl  text-center sm:text-4xl md:text-5xl text-white"> Appointment Booking</h2>
      <p className="w-full py-8 mx-auto -mt-2 text-lg text-center text-white intro sm:max-w-3xl">Select a date and time for your Booking</p>
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
    </>

   
  );
}
