import React, { useState, useEffect } from 'react';
import '../assets/style/Booking.css';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, onSnapshot, query } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

function BookingApp() {
    const today = new Date();
    const [step, setStep] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState({ text: "", isError: false });
    const [errors, setErrors] = useState({});
    const [adminHolidays, setAdminHolidays] = useState([]);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const q = query(collection(db, "holidays"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const holidayDates = snap.docs.map(doc => doc.id);
            setAdminHolidays(holidayDates);
        });
        return () => unsubscribe();
    }, []);

    const triggerToast = (text, isError = false) => {
        setToastMessage({ text, isError });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const validateForm = () => {
        let tempErrors = {};
        if (firstName.trim().length < 2) tempErrors.firstName = "First name is too short";
        if (lastName.trim().length < 2) tempErrors.lastName = "Last name is too short";
        if (!email.includes('@')) tempErrors.email = "Invalid email address";
        if (number.length < 10) tempErrors.number = "Invalid phone number";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSendCode = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);

        const templateParams = {
            to_name: firstName,
            to_email: email.trim().toLowerCase(),
            otp_code: otp,
            from_name: "AMALYZE"
        };

        try {
            await emailjs.send('service_8x55t1g', 'template_ns3ljzk', templateParams, 'aeA09BV8gXTdUDj0I');
            setStep(4);
            triggerToast("Verification code sent! 📧");
        } catch (error) {
            console.error("EmailJS Error:", error);
            triggerToast("Error sending code.", true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyAndBook = async () => {
        if (verificationCode !== generatedOtp) {
            triggerToast("Invalid code.", true);
            return;
        }
        setIsSubmitting(true);
        try {
            const fullName = `${firstName.trim()} ${lastName.trim()}`;
            const displayTime = formatTimeDisplay(selectedTime);

            const bookingData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim().toLowerCase(),
                number: "+" + number,
                date: selectedDate,
                time: selectedTime,
                status: "verified",
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, "bookings"), bookingData);

            const adminParams = {
                admin_email: "aminasalik012@gmail.com",
                client_name: fullName,
                date: selectedDate,
                time: displayTime,
                phone: "+" + number,
                client_email: email.trim()
            };

            await emailjs.send('service_8x55t1g', 'template_gkzhgn9', adminParams, 'aeA09BV8gXTdUDj0I');
            triggerToast("Booking Confirmed! ✅");
            setTimeout(() => resetForm(), 3000);
        } catch (error) {
            triggerToast("Database error.", true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setStep(1); setSelectedDate(null); setSelectedTime(null);
        setFirstName(''); setLastName(''); setNumber(''); setEmail('');
        setVerificationCode(''); setGeneratedOtp('');
    };

    const navigateMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        if (newMonth > 11) { newMonth = 0; newYear++; }
        setCurrentMonth(newMonth); setCurrentYear(newYear);
    };

    const formatDateString = (year, month, day) => `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const generateCalendarDays = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        const calendarDays = [];

        
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        for (let i = firstDay; i > 0; i--) {
            calendarDays.push({ day: daysInPrevMonth - i + 1, status: 'booking-other-month', date: null });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = formatDateString(currentYear, currentMonth, d);
            const dateObj = new Date(currentYear, currentMonth, d);
            dateObj.setHours(0, 0, 0, 0);

            let status = 'booking-available';
            if (dateObj < startOfToday || adminHolidays.includes(dateStr)) {
                status = 'booking-unavailable';
            }
            calendarDays.push({ day: d, status, date: dateStr });
        }
        return calendarDays;
    };

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let min = 0; min < 60; min += 30) {
                if (hour === 17 && min > 0) continue;
                const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                slots.push({ time, status: 'booking-available' });
            }
        }
        return slots;
    };

    const formatTimeDisplay = (time24h) => {
        if (!time24h) return "";
        const [hour, min] = time24h.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${min.toString().padStart(2, '0')} ${ampm}`;
    };

 
    const finalWhatsAppNumber = import.meta.env?.VITE_WHATSAPP_NUMBER || "212638798360";
    
    const getWhatsAppLink = () => {
        const text = `Hello AMALYZE, I'd like to confirm my booking:\n\n👤 Name: ${firstName} ${lastName}\n📅 Date: ${selectedDate }\n⏰ Time: ${formatTimeDisplay(selectedTime) }`;
        return `https://wa.me/${finalWhatsAppNumber}?text=${encodeURIComponent(text)}`;
    };

    return (
        <div className="booking-page-wrapper">
            <div className="booking-side-image">
                <div className="image-content-overlay">
                    <h1>Experience Excellence</h1>
                    <p>Secure your premium slot in just a few clicks.</p>
                </div>
            </div>

            <div className="booking-main-content">
                <div className="booking-container glass-card">
                    <header className="booking-header">
                        <h2 className="text-white">Appointment Booking</h2>
                        <div style={{ margin: '10px 0', textAlign: 'center' }}>
                            <p style={{ color: '#fff', fontSize: '14px', opacity: 0.9 }}>
                                {selectedDate ? `${selectedDate} ${selectedTime ? `at ${formatTimeDisplay(selectedTime)}` : ''}` : 'Select a date and time'}
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px 0', padding: '0 10px' }}>
                            {[1, 2, 3, 4].map((s) => (
                                <div key={s} style={{
                                    width: '30px', height: '30px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: step >= s ? '#fff' : 'rgba(255,255,255,0.1)',
                                    color: step >= s ? '#000' : '#fff',
                                    border: '2px solid #fff'
                                }}>{step > s ? '✓' : s}</div>
                            ))}
                        </div>
                    </header>

                    {step === 1 && (
                        <div className="booking-card-inner">
                            <div className="booking-calendar-header">
                                <button onClick={() => navigateMonth(-1)}>&lt;</button>
                                <h3 className="text-white">{monthNames[currentMonth]} {currentYear}</h3>
                                <button onClick={() => navigateMonth(1)}>&gt;</button>
                            </div>
                            <div className="booking-weekdays">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
                            </div>
                            <div className="booking-days">
                                {generateCalendarDays().map((d, idx) => (
                                    <div key={idx}
                                        className={`booking-day ${d.status} ${selectedDate === d.date ? 'booking-selected' : ''}`}
                                        onClick={() => { if (d.status === 'booking-available') { setSelectedDate(d.date); setStep(2); } }}>
                                        {d.day}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="booking-card-inner">
                            <div className="booking-inner-header">
                                <h3 className="text-white">Select Time</h3>
                                <button className="back-link" onClick={() => setStep(1)}>Change Date</button>
                            </div>
                            <div className="booking-time-slots-grid">
                                {generateTimeSlots().map(slot => (
                                    <div key={slot.time}
                                        className={`booking-time-slot ${slot.status}`}
                                        onClick={() => { setSelectedTime(slot.time); setStep(3); }}>
                                        {formatTimeDisplay(slot.time)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="booking-card-inner">
                            <div className="booking-inner-header">
                                <h3 className="text-white">Your Details</h3>
                                <button className="back-link" onClick={() => setStep(2)}>Back</button>
                            </div>
                            <div className="booking-form-group">
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                            </div>
                            <div className="booking-form-group">
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                            </div>
                            <div className="booking-form-group">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            </div>
                            <div className="booking-form-group">
                                <PhoneInput country={'ma'} value={number} onChange={phone => setNumber(phone)} containerClass="phone-container" inputClass="phone-input-field" />
                            </div>
                            <button className="booking-confirm-btn" onClick={handleSendCode} disabled={!firstName || isSubmitting}>
                                {isSubmitting ? "Sending..." : "Send Verification Code"}
                            </button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="booking-card-inner">
                            <div className="booking-inner-header">
                                <h3 className="text-white">Enter OTP</h3>
                                <button className="back-link" onClick={() => setStep(3)}>Back</button>
                            </div>
                            <div className="booking-form-group">
                                <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="000000" className="otp-input" style={{ textAlign: 'center', fontSize: '24px' }} />
                            </div>
                            <button className="booking-confirm-btn" onClick={handleVerifyAndBook} disabled={isSubmitting}>
                                {isSubmitting ? "Verifying..." : "Confirm Booking"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <a href={getWhatsAppLink()} className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <div className="whatsapp-pulse"></div>
                <svg className="whatsapp-icon" viewBox="0 0 448 512" width="25" height="25">
                    <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.5 2.5-11.2 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.8-17-41.1-4.5-10.9-9.1-9.4-12.4-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                </svg>
            </a>

            <div className={`booking-toast-notification ${showToast ? 'booking-show' : ''}`}>
                <div className={`booking-toast-icon ${toastMessage.isError ? 'bg-red-500' : 'bg-green-500'}`}>
                    {toastMessage.isError ? '!' : '✓'}
                </div>
                <div className="booking-toast-message">{toastMessage.text}</div>
            </div>
        </div>
    );
}

export default BookingApp;