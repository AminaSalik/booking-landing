import React, { useState } from 'react';
import '../assets/style/Booking.css';
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from '@emailjs/browser';

// Import Phone Input and its styles
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const timeSlotStatuses = {
    '2026-04-11': {
        '09:00': 'reserved', '09:30': 'reserved', '10:00': 'unavailable',
        '10:30': 'unavailable', '11:00': 'reserved', '11:30': 'reserved',
        '12:00': 'unavailable', '12:30': 'unavailable', '13:00': 'available',
        '13:30': 'available', '14:00': 'available', '14:30': 'available',
        '15:00': 'available', '15:30': 'available', '16:00': 'available',
        '16:30': 'reserved', '17:00': 'available', '17:30': 'available',
    },
};

const dateStatuses = {
    '2026-04-01': 'available', '2026-04-05': 'reserved', '2026-04-20': 'unavailable',
};

function BookingApp() {
    const today = new Date();
    const [step, setStep] = useState(1);
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(''); // New Email State
    const [number, setNumber] = useState('');

    // Email OTP States
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastMessage, setToastMessage] = useState({ text: "Booking Sent! ✅", isError: false });
    const [errors, setErrors] = useState({});

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // --- Email OTP Logic ---
    const handleSendCode = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);

        // Generate a random 6-digit code
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(otp);

        const templateParams = {
            to_name: firstName,
            to_email: email,
            otp_code: otp,
            from_name: "AMALYZE",
        };
        emailjs.init("aeA09BV8gXTdUDj0l");
        try {
            await emailjs.send(
                'service_8x55t1g',
                'template_ns3ljzk',
                templateParams,
                'aeA09BV8gXTdUDj0I'

            );

            setStep(4);
            setToastMessage({ text: "Verification code sent to email! 📧", isError: false });
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error(error);
            setToastMessage({ text: "Error sending Email. Check your connection.", isError: true });
            setShowToast(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyAndBook = async () => {
        if (verificationCode !== generatedOtp) {
            setToastMessage({ text: "Invalid code. Try again.", isError: true });
            setShowToast(true);
            return;
        }

        setIsSubmitting(true);
        try {
            const bookingData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                number: "+" + number,
                date: selectedDate,
                time: selectedTime,
                status: "verified",
                createdAt: serverTimestamp()
            };
            await addDoc(collection(db, "bookings"), bookingData);
            setToastMessage({ text: "Booking Confirmed! ✅", isError: false });
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                resetForm();
            }, 3000);
        } catch (error) {
            alert("Booking failed to reach server.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
        setFirstName('');
        setLastName('');
        setNumber('');
        setEmail('');
        setVerificationCode('');
        setGeneratedOtp('');
    };

    // --- Helpers (Same as your original logic) ---
    const navigateMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        if (newMonth > 11) { newMonth = 0; newYear++; }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
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
            let status = dateStatuses[dateStr] || 'booking-available';
            if (dateObj < new Date(today.setHours(0, 0, 0, 0))) status = 'booking-unavailable';
            calendarDays.push({ day: d, status, date: dateStr, isToday: dateObj.toDateString() === new Date().toDateString() });
        }
        return calendarDays;
    };

    const generateTimeSlots = () => {
        if (!selectedDate) return [];
        const slots = timeSlotStatuses[selectedDate] || {};
        const defaultSlots = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let min = 0; min < 60; min += 30) {
                if (hour === 17 && min > 0) continue;
                const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                const status = slots[time] ? `booking-${slots[time]}` : 'booking-available';
                defaultSlots.push({ time, status });
            }
        }
        return defaultSlots;
    };

    const formatTimeDisplay = (time24h) => {
        if (!time24h) return '';
        const [hour, min] = time24h.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${min.toString().padStart(2, '0')} ${ampm}`;
    };

    const formatSelectedDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00');
        return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    };

    const validateForm = () => {
        let tempErrors = {};
        if (firstName.trim().length < 2) tempErrors.firstName = "First name is too short";
        if (lastName.trim().length < 2) tempErrors.lastName = "Last name is too short";
        if (!email.includes('@')) tempErrors.email = "Invalid email address";
        if (number.length < 10) tempErrors.number = "Please enter a valid phone number";
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
                            <p className="selection-info text-white/70">Selected Date: {formatSelectedDate(selectedDate)}</p>
                            <div className="booking-time-slots-grid">
                                {generateTimeSlots().map(slot => (
                                    <div key={slot.time}
                                        className={`booking-time-slot ${slot.status}`}
                                        onClick={() => {
                                            if (slot.status === 'booking-available') {
                                                setSelectedTime(slot.time);
                                                setStep(3);
                                            }
                                        }}>
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
                                <button className="back-link" onClick={() => setStep(2)}>Back to Time</button>
                            </div>
                            <p className="selection-info highlight text-yellow-400 font-bold">
                                {formatSelectedDate(selectedDate)} at {formatTimeDisplay(selectedTime)}
                            </p>

                            <div className="booking-form-group">
                                <label className="text-white/80">First Name</label>
                                <input type="text" className={errors.firstName ? 'error-border' : ''} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>

                            <div className="booking-form-group">
                                <label className="text-white/80">Last Name</label>
                                <input type="text" className={errors.lastName ? 'error-border' : ''} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>

                            <div className="booking-form-group">
                                <label className="text-white/80">Email (For Verification)</label>
                                <input type="email" className={errors.email ? 'error-border' : ''} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>

                            <div className="booking-form-group">
                                <label className="text-white/80">Phone Number</label>
                                <PhoneInput country={'ma'} value={number} onChange={phone => setNumber(phone)} containerClass="phone-container" inputClass="phone-input-field" />
                                {errors.number && <span className="error-text">{errors.number}</span>}
                            </div>

                            <button className="booking-confirm-btn" onClick={handleSendCode} disabled={!firstName || !lastName || !number || !email || isSubmitting}>
                                {isSubmitting ? "Sending Code..." : "Send Verification Code"}
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
                                <label className="text-white/80">A 6-digit code was sent to {email}</label>
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="000000"
                                    style={{ textAlign: 'center', fontSize: '24px', letterSpacing: '8px' }}
                                />
                            </div>
                            <button className="booking-confirm-btn" onClick={handleVerifyAndBook} disabled={verificationCode.length < 6 || isSubmitting}>
                                {isSubmitting ? "Verifying..." : "Confirm Booking Now"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Global Notification Toast */}
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