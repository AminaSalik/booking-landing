import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Shield, Clock, Smartphone, Zap, ChevronLeft, ChevronRight, X } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/style/Services.css';

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedService]);

  const services = [
    {
      title: "Real-time Scheduling",
      desc: "Instant synchronization across all your devices with 0.1s latency.",
      fullDetails: "Our proprietary sync engine ensures that every appointment made on mobile, web, or tablet updates instantly. Includes time-zone detection and buffer-time management to prevent any scheduling conflicts.",
      icon: <Clock size={32} />,
      tag: "Popular"
    },
    {
      title: "Secure Payments",
      desc: "Integrated stripe and paypal processing with end-to-end encryption.",
      fullDetails: "Handle deposits, full payments, and tips securely. We utilize PCI-compliant gateways to ensure your revenue and client data are always protected with 256-bit encryption.",
      icon: <Shield size={32} />,
      tag: "Secure"
    },
    {
      title: "Smart Reminders",
      desc: "Automated WhatsApp and Email alerts to reduce no-shows by 90%.",
      fullDetails: "Customizable templates allow you to send reminders 24h or 1h before. Clients can confirm or reschedule directly from the notification, automatically updating your dashboard.",
      icon: <Zap size={32} />,
      tag: "Automated"
    },
    {
      title: "Mobile App Control",
      desc: "Manage your entire business dashboard from the palm of your hand.",
      fullDetails: "The native iOS and Android apps allow you to view daily reports, block dates, and chat with customers while you are on the move. Stay connected to your business 24/7.",
      icon: <Smartphone size={32} />,
      tag: "Mobile"
    },
    {
      title: "Cloud Analytics",
      desc: "Deep insights into your business performance with AI-driven reports.",
      fullDetails: "Track your most popular services, peak hours, and customer retention rates with visual graphs and exportable CSV reports to help you grow your brand.",
      icon: <Zap size={32} />,
      tag: "Insight"
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="gold-text">Our Premium <span className="white-text">Services</span></h2>
          <div className="gold-underline"></div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="services-swiper"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="service-card">
                <div className="glass-content">
                  <div className="icon-box">{service.icon}</div>
                  <span className="service-tag">{service.tag}</span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <button className="service-btn" onClick={() => setSelectedService(service)}>
                    Learn More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="slider-controls">
            <button className="custom-prev"><ChevronLeft size={24} /></button>
            <button className="custom-next"><ChevronRight size={24} /></button>
          </div>
        </Swiper>
      </div>
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedService(null)}>
              <X size={28} />
            </button>
            <div className="modal-icon-box">{selectedService.icon}</div>
            <h2 className="gold-text">{selectedService.title}</h2>
            <div className="modal-divider"></div>
            <p className="modal-desc">{selectedService.fullDetails}</p>
            <button className="modal-close-action" onClick={() => setSelectedService(null)}>
              Close Details
            </button>
          </div>
        </div>
      )}
    </section>
  );
}