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

    // State to hold holiday dates from database
    const [adminHolidays, setAdminHolidays] = useState([]);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Listen to Holidays from Firestore
    useEffect(() => {
        const q = query(collection(db, "holidays"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const holidayDates = snap.docs.map(doc => doc.id); // ID is the date string YYYY-MM-DD
            setAdminHolidays(holidayDates);
        });
        return () => unsubscribe();
    }, []);

    const handleSendCode = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);
        const templateParams = { to_name: firstName, to_email: email, otp_code: otp, from_name: "AMALYZE" };
        emailjs.init("aeA09BV8gXTdUDj0l");
        try {
            await emailjs.send('service_8x55t1g', 'template_ns3ljzk', templateParams, 'aeA09BV8gXTdUDj0I');
            setStep(4);
            triggerToast("Verification code sent! 📧");
        } catch (error) {
            triggerToast("Error sending Email.", true);
        } finally { setIsSubmitting(false); }
    };

    const handleVerifyAndBook = async () => {
        if (verificationCode !== generatedOtp) {
            triggerToast("Invalid verification code.", true);
            return;
        }
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "bookings"), {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                number: "+" + number,
                date: selectedDate,
                time: selectedTime,
                status: "verified",
                createdAt: serverTimestamp()
            });
            triggerToast("Booking Confirmed! ✅");
            setTimeout(() => resetForm(), 3000);
        } catch (error) { alert("Server error. Please try again."); } finally { setIsSubmitting(false); }
    };

    const triggerToast = (text, isError = false) => {
        setToastMessage({ text, isError });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
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
        
        for (let i = firstDay; i > 0; i--) {
            calendarDays.push({ day: daysInPrevMonth - i + 1, status: 'booking-other-month', date: null });
        }
        
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = formatDateString(currentYear, currentMonth, d);
            const dateObj = new Date(currentYear, currentMonth, d);
            let status = 'booking-available';
            
            // 1. Disable Past Dates
            if (dateObj < new Date(today.setHours(0, 0, 0, 0))) {
                status = 'booking-unavailable';
            } 
            // 2. Disable Dates marked as Holidays by Admin
            else if (adminHolidays.includes(dateStr)) {
                status = 'booking-unavailable';
            }

            calendarDays.push({ day: d, status, date: dateStr, isToday: dateObj.toDateString() === new Date().toDateString() });
        }
        return calendarDays;
    };

    const generateTimeSlots = () => {
        if (!selectedDate) return [];
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
        if (!time24h) return '';
        const [hour, min] = time24h.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${min.toString().padStart(2, '0')} ${ampm}`;
    };

    const validateForm = () => {
        let tempErrors = {};
        if (firstName.trim().length < 2) tempErrors.firstName = "First name required";
        if (lastName.trim().length < 2) tempErrors.lastName = "Last name required";
        if (!email.includes('@')) tempErrors.email = "Invalid email";
        if (number.length < 10) tempErrors.number = "Invalid phone";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
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
                        <div className="booking-steps-nav">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`booking-step-dot ${step >= i ? 'active' : ''}`}>{i}</div>
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
                            <p className="selection-info text-white/70">Selected: {selectedDate}</p>
                            <div className="booking-time-slots-grid">
                                {generateTimeSlots().map(slot => (
                                    <div key={slot.time}
                                        className={`booking-time-slot ${slot.status}`}
                                        onClick={() => { if (slot.status === 'booking-available') { setSelectedTime(slot.time); setStep(3); } }}>
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
                                <label className="text-white/80">First Name</label>
                                <input type="text" className={errors.firstName ? 'error-border' : ''} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>
                            <div className="booking-form-group">
                                <label className="text-white/80">Last Name</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <div className="booking-form-group">
                                <label className="text-white/80">Email</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="booking-form-group">
                                <label className="text-white/80">Phone</label>
                                <PhoneInput country={'ma'} value={number} onChange={phone => setNumber(phone)} containerClass="phone-container" />
                            </div>
                            <button className="booking-confirm-btn" onClick={handleSendCode} disabled={!firstName || !number || isSubmitting}>
                                {isSubmitting ? "Sending Code..." : "Send Verification Code"}
                            </button>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="booking-card-inner">
                            <h3 className="text-white">Enter Verification Code</h3>
                            <p className="text-white/60 mb-4 text-center">Sent to {email}</p>
                            <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="otp-input" style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '4px' }} />
                            <button className="booking-confirm-btn" onClick={handleVerifyAndBook} disabled={isSubmitting}>Confirm Booking</button>
                        </div>
                    )}
                </div>
            </div>

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