import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig'; 
import { useNavigate } from 'react-router-dom'; 
import { 
    collection, 
    query, 
    onSnapshot, 
    orderBy, 
    doc, 
    updateDoc, 
    deleteDoc,
    setDoc
} from "firebase/firestore";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [newHoliday, setNewHoliday] = useState('');
    const navigate = useNavigate();  

    useEffect(() => {
        // Real-time listener for bookings
        const qBookings = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubBookings = onSnapshot(qBookings, (snap) => {
            setBookings(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Real-time listener for holidays
        const qHolidays = query(collection(db, "holidays"));
        const unsubHolidays = onSnapshot(qHolidays, (snap) => {
            setHolidays(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => { unsubBookings(); unsubHolidays(); };
    }, []);

    const addHoliday = async () => {
        if (!newHoliday) return;
        try {
            // Use date as ID to prevent duplicates
            await setDoc(doc(db, "holidays", newHoliday), { date: newHoliday });
            setNewHoliday('');
        } catch (e) { console.error("Error adding holiday:", e); }
    };

    const deleteHoliday = async (id) => {
        try {
            await deleteDoc(doc(db, "holidays", id));
        } catch (e) { console.error("Error deleting holiday:", e); }
    };

    const handleWhatsAppConfirm = async (booking) => {
        try {
            const bookingRef = doc(db, "bookings", booking.id);
            await updateDoc(bookingRef, { status: "confirmed" });

            const msg = `Hello ${booking.firstName}%0AYour booking is confirmed ✅%0A📅 Date: ${booking.date}%0A🕒 Time: ${booking.time}%0AWe are waiting for you!`;
            window.open(`https://wa.me/${booking.fullPhone || booking.number}?text=${msg}`, '_blank');
        } catch (error) { console.error("Error updating status: ", error); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                await deleteDoc(doc(db, "bookings", id));
            } catch (error) { console.error("Error deleting: ", error); }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                
                <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors group">
                    <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> Back to Site
                </button>

                {/* Holiday Manager Section */}
                <div className="mb-10 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <h2 className="text-xl font-bold mb-4 text-yellow-500">Holiday Manager (Disable Dates)</h2>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <input 
                            type="date" 
                            value={newHoliday} 
                            onChange={(e) => setNewHoliday(e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white flex-1 focus:outline-none focus:border-yellow-500"
                        />
                        <button onClick={addHoliday} className="bg-yellow-600 hover:bg-yellow-500 px-8 py-2 rounded-lg font-bold transition-colors">
                            Add Holiday
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {holidays.length === 0 && <p className="text-gray-500 text-sm italic">No holidays set.</p>}
                        {holidays.map(h => (
                            <span key={h.id} className="bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full flex items-center gap-3 text-sm text-red-400">
                                {h.date}
                                <button onClick={() => deleteHoliday(h.id)} className="text-red-500 hover:text-white font-bold text-lg leading-none">&times;</button>
                            </span>
                        ))}
                    </div>
                </div>

                <header className="flex justify-between items-center mb-10 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">Admin Dashboard</h1>
                        <p className="text-gray-400 text-sm">Real-time Bookings Manager</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-mono text-yellow-500">{bookings.length}</div>
                        <div className="text-[10px] uppercase tracking-widest text-gray-500">Total Bookings</div>
                    </div>
                </header>

                <div className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-700/50 text-gray-400 text-xs uppercase tracking-tighter">
                                <tr>
                                    <th className="px-6 py-4">Client Name</th>
                                    <th className="px-6 py-4">Appointment</th>
                                    <th className="px-6 py-4">Phone Number</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-750 transition-all">
                                        <td className="px-6 py-4 font-medium italic text-gray-200">
                                            {booking.firstName} {booking.lastName}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm">{booking.date}</div>
                                            <div className="text-xs text-yellow-500 font-bold">{booking.time}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-mono">{booking.fullPhone || booking.number}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                booking.status === 'confirmed' 
                                                ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                                                : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                            }`}>
                                                {booking.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => handleWhatsAppConfirm(booking)} className="bg-green-600 hover:bg-green-500 p-2 rounded-lg transition-all text-white">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.5 2.5-11.2 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.8-17-41.1-4.5-10.9-9.1-9.4-12.4-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                                                </button>
                                                <button onClick={() => handleDelete(booking.id)} className="bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white p-2 rounded-lg transition-all">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;