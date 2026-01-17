import React, { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, query, onSnapshot, orderBy, doc, updateDoc } from "firebase/firestore";

const AdminDashboard = () => {
    const [bookings, setBookings] = useState([]);

    // جلب البيانات لحظياً من Firebase
    useEffect(() => {
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBookings(data);
        });
        return () => unsubscribe();
    }, []);

    const handleWhatsAppConfirm = async (booking) => {
        try {
            // 1. تحديث الحالة في قاعدة البيانات إلى Confirmed
            const bookingRef = doc(db, "bookings", booking.id);
            await updateDoc(bookingRef, { status: "confirmed" });

            // 2. إرسال رسالة الواتساب
            const msg = `مرحباً ${booking.firstName} %0Aتم تأكيد حجزك بنجاح ✅%0A📅 التاريخ: ${booking.date}%0A🕒 الوقت: ${booking.time}%0Aنحن بانتظارك!`;
            window.open(`https://wa.me/${booking.number}?text=${msg}`, '_blank');
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-10 bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-200 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
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
                                    <th className="px-6 py-4 text-center">Action</th>
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
                                        <td className="px-6 py-4 text-sm font-mono">{booking.number}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                booking.status === 'confirmed' 
                                                ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                                                : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => handleWhatsAppConfirm(booking)}
                                                className="bg-green-600 hover:bg-green-500 p-2 rounded-lg transition-all flex items-center justify-center mx-auto"
                                                title="Confirm & Open WhatsApp"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                                                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.4 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.2-8.5-44.2-27.1-16.4-14.6-27.4-32.7-30.6-38.1-3.2-5.5-.3-8.5 2.5-11.2 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.3 3.7-5.6 5.6-9.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.4-29.8-17-41.1-4.5-10.9-9.1-9.4-12.4-9.6-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.5 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                                                </svg>
                                            </button>
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