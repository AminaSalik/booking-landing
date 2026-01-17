import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from "./components/Hero"; 
import Dashboard from "./components/AdminDashboard"; 
import AdminPanel from "./components/AdminLogin"; 
import './App.css';

function App() {
  return (
    <Routes>
    
      <Route path="/" element={<Hero />} />


      <Route path="/admin" element={<AdminPanel />} />


      <Route path="/admin-dashboard" element={<Dashboard />} />

 
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;