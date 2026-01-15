import React, { useState } from 'react';
import '../assets/style/Booking.css'; 

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
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const navigateMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        if (newMonth > 11) { newMonth = 0; newYear++; }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const formatDateString = (year, month, day) => `${year}-${(month).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const generateCalendarDays = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        const calendarDays = [];
        for (let i = firstDay; i > 0; i--) {
            calendarDays.push({ day: daysInPrevMonth - i + 1, status: 'booking-other-month', date: null });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = formatDateString(currentYear, currentMonth + 1, d);
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

    const handleBooking = () => {
        setShowToast(true);
        setTimeout(() => { 
            setShowToast(false); 
            setStep(1); 
            setSelectedDate(null); 
            setSelectedTime(null);
            setFirstName('');
            setLastName('');
            setEmail('');
        }, 3000);
    };

    return (
        <div className="booking-container">
            <header className="booking-header">
                <h2 className="text-white text-center">Appointment Booking</h2>
                {/* Modern Step Indicator */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`booking-day ${step >= i ? 'booking-selected' : 'booking-unavailable'}`} style={{ width: '35px', height: '35px', cursor: 'default' }}>{i}</div>
                    ))}
                </div>
            </header>

            {/* STEP 1: CALENDAR */}
            {step === 1 && (
                <div className="booking-card">
                    <div className="booking-calendar-header">
                        <button onClick={() => navigateMonth(-1)}>&lt;</button>
                        <h2 className='booking-text-black'>{monthNames[currentMonth]} {currentYear}</h2>
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
                <div className="booking-card booking-visible">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h2 className='booking-text-black'>Select Time</h2>
                        <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Change Date</button>
                    </div>
                    <p style={{marginBottom: '15px'}}>Date: {formatSelectedDate(selectedDate)}</p>
                    <div className="booking-time-slots-container">
                        {generateTimeSlots().map(slot => (
                            <div key={slot.time} 
                                className={`booking-time-slot ${slot.status}`}
                                onClick={() => {
                                    if (slot.status === 'booking-available') { 
                                        setSelectedTime(slot.time); 
                                        setStep(3); // Direct transition to details
                                    }
                                }}>
                                {formatTimeDisplay(slot.time)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 3: DETAILS FORM */}
            {step === 3 && (
                <div className="booking-card booking-details-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <h2 className='booking-text-black'>Appointment Details</h2>
                        <button onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline' }}>Back to Time</button>
                    </div>
                    
                    <div className="booking-selected-time-display">
                        <p className="booking-time-display">
                            {formatSelectedDate(selectedDate)} at {formatTimeDisplay(selectedTime)}
                        </p>
                    </div>

                    <div className="booking-form-group">
                        <label className="booking-required-field">First Name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />
                    </div>
                    <div className="booking-form-group">
                        <label className="booking-required-field">Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
                    </div>
                    <div className="booking-form-group">
                        <label className="booking-required-field">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                    </div>

                    <button className="booking-btn-primary" onClick={handleBooking} disabled={!firstName || !lastName || !email}>Save Booking</button>
                </div>
            )}

            {/* Toast Notification */}
            <div className={`booking-toast-notification ${showToast ? 'booking-show' : ''}`}>
                <div className="booking-toast-icon">✓</div>
                <div className="booking-toast-message">Your appointment has been successfully booked!</div>
            </div>
        </div>
    );
}

export default BookingApp;