import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; 
import { store, persistor } from './redux/store'; 
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/Login/AdminLogin';
import StudentLogin from './components/Login/StudentLogin';
import Register from './components/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import WardenDashboard from './components/Dashboard/WardenDashboard';
import Accountant from './components/Dashboard/Accountant';
import Error from './components/Error';
import Contributors from './components/Contributors';


function App() {
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admindashboard" element={<AdminDashboard/>} />
            <Route path="/warden" element={<WardenDashboard/>} />
            <Route path="/accountant" element={<Accountant/>} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/student" element={<StudentLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contributors" element={<Contributors />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
