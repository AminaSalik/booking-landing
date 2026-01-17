import React, { useState } from 'react';
import { auth } from '../config/firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/style/AdminPanel.css';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
        
            await signInWithEmailAndPassword(auth, email, password);
            
        
            navigate('/admin-dashboard'); 
        } catch (err) {
            console.error("Login Error:", err.code);
         
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password.');
            } else {
                setError('Failed to login. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
         
            <div className="login-side-image">
                <div className="image-overlay-content">
                    <h2>Admin Portal</h2>
                    <p>Manage your bookings and schedule with ease.</p>
                </div>
            </div>

            <div className="login-main-content">
                <div className="login-glass-card">
                    <div className="login-header">
                        <h1>Welcome Back</h1>
                        <p>Enter your credentials to access the dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="login-input-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="admin@example.com" 
                                required 
                                autoComplete="email"
                            />
                        </div>

                        <div className="login-input-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="••••••••" 
                                required 
                                autoComplete="current-password"
                            />
                        </div>

                        {error && <div className="login-error-msg">{error}</div>}

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? (
                                <span className="loader-text">Verifying...</span>
                            ) : (
                                "Login to Dashboard"
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <button className="back-to-site" onClick={() => navigate('/')}>
                            ← Back to Booking Site
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;