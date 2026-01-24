import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Shield, Clock, Smartphone, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../assets/style/Services.css';

export default function Services() {
  const services = [
    { title: "Real-time Scheduling", desc: "Instant synchronization across all your devices with 0.1s latency.", icon: <Clock size={32} />, tag: "Popular" },
    { title: "Secure Payments", desc: "Integrated stripe and paypal processing with end-to-end encryption.", icon: <Shield size={32} />, tag: "Secure" },
    { title: "Smart Reminders", desc: "Automated WhatsApp and Email alerts to reduce no-shows by 90%.", icon: <Zap size={32} />, tag: "Automated" },
    { title: "Mobile App Control", desc: "Manage your entire business dashboard from the palm of your hand.", icon: <Smartphone size={32} />, tag: "Mobile" },
    { title: "Cloud Analytics", desc: "Deep insights into your business performance with AI-driven reports.", icon: <Zap size={32} />, tag: "Insight" }
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
          autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                  <button className="service-btn">Learn More</button>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Arrows */}
          <div className="slider-controls">
            <button className="custom-prev"><ChevronLeft size={24} /></button>
            <button className="custom-next"><ChevronRight size={24} /></button>
          </div>
        </Swiper>
      </div>
    </section>
  );
}