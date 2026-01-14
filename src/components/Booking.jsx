import React, { useState } from 'react';
import '../assets/style/Booking.css'; 

const timeSlotStatuses = {
    '2025-04-11': {
        '09:00': 'reserved',
        '09:30': 'reserved',
        '10:00': 'unavailable',
        '10:30': 'unavailable',
        '11:00': 'reserved',
        '11:30': 'reserved',
        '12:00': 'unavailable',
        '12:30': 'unavailable',
        '13:00': 'available',
        '13:30': 'available',
        '14:00': 'available',
        '14:30': 'available',
        '15:00': 'available',
        '15:30': 'available',
        '16:00': 'available',
        '16:30': 'reserved',
        '17:00': 'available',
        '17:30': 'available',
    },
};

const dateStatuses = {
    '2025-04-01': 'available',
    '2025-04-02': 'available',
    '2025-04-03': 'available',
    '2025-04-04': 'available',
    '2025-04-05': 'reserved',
    '2025-04-06': 'available',
    '2025-04-07': 'available',
    '2025-04-08': 'available',
    '2025-04-09': 'available',
    '2025-04-10': 'available',
    '2025-04-11': 'available',
    '2025-04-12': 'available',
    '2025-04-13': 'available',
    '2025-04-14': 'available',
    '2025-04-15': 'reserved',
    '2025-04-16': 'available',
    '2025-04-17': 'available',
    '2025-04-18': 'available',
    '2025-04-19': 'available',
    '2025-04-20': 'unavailable',
    '2025-04-21': 'available',
    '2025-04-22': 'available',
    '2025-04-23': 'available',
    '2025-04-24': 'available',
    '2025-04-25': 'reserved',
    '2025-04-26': 'available',
    '2025-04-27': 'available',
    '2025-04-28': 'available',
    '2025-04-29': 'available',
    '2025-04-30': 'available',
};

function BookingApp() {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [showToast, setShowToast] = useState(false);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const navigateMonth = (delta) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        if (newMonth > 11) { newMonth = 0; newYear++; }
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const formatDateString = (year, month, day) =>
        `${year}-${(month).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    const generateCalendarDays = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
        const calendarDays = [];

        for (let i = firstDay; i > 0; i--) {
            const day = daysInPrevMonth - i + 1;
            calendarDays.push({ day, status: 'booking-other-month', date: null });
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = formatDateString(currentYear, currentMonth + 1, d);
            const dateObj = new Date(currentYear, currentMonth, d);
            let status = dateStatuses[dateStr] || 'booking-available';
            if (dateObj < new Date(today.setHours(0, 0, 0, 0))) status = 'booking-unavailable';
            const isToday = dateObj.toDateString() === new Date().toDateString();
            calendarDays.push({ day: d, status, date: dateStr, isToday });
        }

        return calendarDays;
    };

    const generateTimeSlots = () => {
        if (!selectedDate) return [];
        const slots = timeSlotStatuses[selectedDate] || {};
        if (Object.keys(slots).length === 0) {
            const defaultSlots = [];
            for (let hour = 9; hour <= 17; hour++) {
                for (let min = 0; min < 60; min += 30) {
                    if (hour === 17 && min > 0) continue;
                    const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
                    defaultSlots.push({ time, status: 'booking-available' });
                }
            }
            return defaultSlots;
        }
        return Object.keys(slots).sort().map(time => ({ time, status: `booking-${slots[time]}` }));
    };

    const formatTimeDisplay = (time24h) => {
        const [hourStr, minuteStr] = time24h.split(':');
        const hour = parseInt(hourStr);
        let endHour = hour;
        let endMinute = parseInt(minuteStr) + 30;
        if (endMinute >= 60) { endHour++; endMinute -= 60; }
        const startHour12 = hour % 12 || 12;
        const endHour12 = endHour % 12 || 12;
        const startAmPm = hour < 12 ? 'AM' : 'PM';
        const endAmPm = endHour < 12 ? 'AM' : 'PM';
        return `${startHour12}:${minuteStr} ${startAmPm} - ${endHour12}:${endMinute.toString().padStart(2, '0')} ${endAmPm}`;
    };

    const formatSelectedDate = (dateStr) => {
        const dateObj = new Date(dateStr + 'T00:00');
        const day = dateObj.getDate();
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleBooking = () => {
        const data = {
            firstName,
            lastName,
            email,
            selectedDate,
            selectedTime,
        };
        console.log('Booking:', data);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const isFormValid = selectedDate && selectedTime && firstName.trim() && lastName.trim() && email.trim();

    return (
        <div className="booking-container">
            <header className="booking-header">
               <h2 className="w-full text-3xl  text-center sm:text-4xl md:text-5xl text-white"> Appointment Booking</h2>
      <p className="w-full py-8 mx-auto -mt-2 text-lg text-center text-white intro sm:max-w-3xl">Select a date and time for your Booking</p>
            </header>


       

            <div className="booking-card booking-calendar-card">
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
                        <div
                            key={idx}
                            className={`booking-day ${d.status} ${d.isToday ? 'booking-current-day' : ''} ${selectedDate === d.date ? 'booking-selected' : ''}`}
                            onClick={() => d.status === 'booking-available' && setSelectedDate(d.date)}
                        >
                            {d.day}
                        </div>
                    ))}
                </div>
            </div>

            {selectedDate && (
                <div className="booking-card booking-time-slots-card booking-visible">
                    <h2 className='booking-text-black'>Time Slots for {formatSelectedDate(selectedDate)}</h2>
                    <div className="booking-time-slots-container">
                        {generateTimeSlots().map(slot => (
                            <div
                                key={slot.time}
                                className={`booking-time-slot ${slot.status} ${selectedTime === slot.time ? 'booking-selected' : ''}`}
                                onClick={() => slot.status === 'booking-available' && setSelectedTime(slot.time)}
                            >
                                {formatTimeDisplay(slot.time)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="booking-card booking-details-card">
                <h2 className='booking-text-black'>Appointment Details</h2>
                <div className="booking-selected-time-display">
                    <p>Selected Time:</p>
                    <p className="booking-time-display">
                        {selectedTime
                            ? `${formatSelectedDate(selectedDate)} at ${selectedTime}`
                            : 'Select a date and time'}
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

                <button className="booking-btn-primary" onClick={handleBooking} disabled={!isFormValid}>Save</button>
            </div>

            <div className="booking-status-legend">
                <h3>Status Legend</h3>
                <div className="booking-legend-items">
                    <div className="booking-legend-item">
                        <div className="booking-legend-color booking-available"></div>
                        <span>Available</span>
                    </div>
                    <div className="booking-legend-item">
                        <div className="booking-legend-color booking-reserved"></div>
                        <span>Reserved</span>
                    </div>
                    <div className="booking-legend-item">
                        <div className="booking-legend-color booking-unavailable"></div>
                        <span>Unavailable</span>
                    </div>
                </div>
            </div>

            {/* Toast */}
            <div className={`booking-toast-notification ${showToast ? 'booking-show' : ''}`}>
                <div className="booking-toast-icon">✓</div>
                <div className="booking-toast-message">Your appointment has been successfully booked!</div>
            </div>
        </div>
    );
}

export default BookingApp;
