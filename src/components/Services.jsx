import React from 'react';
import '../assets/style/Services.css';
import { Shield, Clock, Smartphone, Zap } from 'lucide-react'; // Example icons

export default function Services() {
  const services = [
    {
      title: "Real-time Scheduling",
      desc: "Instant synchronization across all your devices with 0.1s latency.",
      icon: <Clock size={32} />,
      tag: "Popular"
    },
    {
      title: "Secure Payments",
      desc: "Integrated stripe and paypal processing with end-to-end encryption.",
      icon: <Shield size={32} />,
      tag: "Secure"
    },
    {
      title: "Smart Reminders",
      desc: "Automated WhatsApp and Email alerts to reduce no-shows by 90%.",
      icon: <Zap size={32} />,
      tag: "Automated"
    },
    {
      title: "Mobile App Control",
      desc: "Manage your entire business dashboard from the palm of your hand.",
      icon: <Smartphone size={32} />,
      tag: "Mobile"
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="gold-text">Our Premium <span className="white-text">Services</span></h2>
          <div className="gold-underline"></div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="glass-content">
                <div className="icon-box">{service.icon}</div>
                <span className="service-tag">{service.tag}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className="service-btn">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}