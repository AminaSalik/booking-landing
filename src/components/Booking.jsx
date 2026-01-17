import React, { useState } from 'react';
import '../assets/style/Booking.css'; 
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Import Phone Input and its styles
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const timeSlotStatuses = {
    '2025-04-11': {
        '09:00': 'reserved', '09:30': 'reserved', '10:00': 'unavailable',
        '10:30': 'unavailable', '11:00': 'reserved', '11:30': 'reserved',
        '12:00': 'unavailable', '12:30': 'unavailable', '13:00': 'available',
        '13:30': 'available', '14:00': 'available', '14:30': 'available',
        '15:00': 'available', '15:30': 'available', '16:00': 'available',
        '16:30': 'reserved', '17:00': 'available', '17:30': 'available',
    },
};

const dateStatuses = {
    '2025-04-01': 'available', '2025-04-05': 'reserved', '2025-04-20': 'unavailable',
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
    const [number, setNumber] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Validation Errors State
    const [errors, setErrors] = useState({});

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
        const [hour, min] = time24h.split(':').map(Number);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        return `${hour % 12 || 12}:${min.toString().padStart(2, '0')} ${ampm}`;
    };

    const formatSelectedDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr + 'T00:00');
        return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    };

    // FORM VALIDATION LOGIC
    const validateForm = () => {
        let tempErrors = {};
        if (firstName.trim().length < 2) tempErrors.firstName = "First name is too short";
        if (lastName.trim().length < 2) tempErrors.lastName = "Last name is too short";
        if (number.length < 10) tempErrors.number = "Please enter a valid phone number";
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleBooking = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const bookingData = {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                number: "+" + number, // Store with + prefix
                date: selectedDate,
                time: selectedTime,
                status: "pending",
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, "bookings"), bookingData);

            setShowToast(true);
            setTimeout(() => { 
                setShowToast(false); 
                setStep(1); 
                setSelectedDate(null); 
                setSelectedTime(null);
                setFirstName('');
                setLastName('');
                setNumber('');
            }, 3000);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("حدث خطأ أثناء الحجز، يرجى المحاولة مرة أخرى.");
        } finally {
            setIsSubmitting(false);
        }
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
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`booking-step-dot ${step >= i ? 'active' : ''}`}>{i}</div>
                            ))}
                        </div>
                    </header>

                    {/* STEP 1: CALENDAR */}
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

                    {/* STEP 2: TIME SLOTS */}
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

                    {/* STEP 3: DETAILS */}
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
                                <input 
                                    type="text" 
                                    className={errors.firstName ? 'error-border' : ''}
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)} 
                                    placeholder="John" 
                                />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>

                            <div className="booking-form-group">
                                <label className="text-white/80">Last Name</label>
                                <input 
                                    type="text" 
                                    className={errors.lastName ? 'error-border' : ''}
                                    value={lastName} 
                                    onChange={(e) => setLastName(e.target.value)} 
                                    placeholder="Doe" 
                                />
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>

                            <div className="booking-form-group">
                                <label className="text-white/80">Phone Number (All Countries)</label>
                                <PhoneInput
                                    country={'ma'} // Default country (Morocco)
                                    value={number}
                                    onChange={phone => setNumber(phone)}
                                    containerClass="phone-container"
                                    inputClass="phone-input-field"
                                    buttonClass="phone-dropdown-btn"
                                />
                                {errors.number && <span className="error-text">{errors.number}</span>}
                            </div>

                            <button 
                                className="booking-confirm-btn" 
                                onClick={handleBooking} 
                                disabled={!firstName || !lastName || !number || isSubmitting}
                            >
                                {isSubmitting ? "Processing..." : "Confirm Booking Now"}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* WhatsApp & Toast components remain the same */}
            <a href="https://wa.me/212600000000" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <div className="whatsapp-pulse"></div>
                <svg className="whatsapp-icon" viewBox="0 0 448 512" width="25" height="25">
                    <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.5 2.5-11.2 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.8-17-41.1-4.5-10.9-9.1-9.4-12.4-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
            </a>

            <div className={`booking-toast-notification ${showToast ? 'booking-show' : ''}`}>
                <div className="booking-toast-icon bg-green-500">✓</div>
                <div className="booking-toast-message">Booking Sent! ✅</div>
            </div>
        </div>
    );
}

export default BookingApp;