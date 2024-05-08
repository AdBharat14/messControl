import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import WardenDashboard from './components/Dashboard/WardenDashboard';
import StudentLogin from './components/Login/StudentLogin';
import AdminLogin from './components/Login/AdminLogin';
import Register from './components/Register';
import Contributors from './components/Contributors';
import Error from './components/Error';
import Toast from './Toast';
import Verify from './verification/Verify';
import Feedback from './feedback/Feedback';
import Paymentsuccess from './components/Paymentsuccess';

function App() {
  const navigate = useNavigate();
  const isAuthenticatedStudent = useSelector(state => state.students.token !== null);
  const isAuthenticatedWarden = useSelector(state => state.wardens.token !== null);
  const isAuthenticated = isAuthenticatedStudent || isAuthenticatedWarden;

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const dashboardPath = isAuthenticatedStudent ? '/dashboard' : '/warden';
      navigate(dashboardPath);
    }
  }, [isAuthenticated, isAuthenticatedStudent, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Verify />} /> */}
        {/* <Route path="/" element={<Feedback />} /> */}
        <Route path="*" element={<Error />} />

        {isAuthenticatedStudent && <Route path="/dashboard" element={<Dashboard />} />}
        {isAuthenticatedWarden && <Route path="/warden" element={<WardenDashboard />} />}

        {!isAuthenticated && (
          <>
            <Route path="/student" element={<StudentLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/paymentsuccess" element={<Paymentsuccess />} />
          </>
        )}
      </Routes>
      <Toast/>
    </>
  );
}

export default App;
