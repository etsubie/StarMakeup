 import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import Appointment from './pages/Appointment';
import Payment from './pages/Payment';
import Feedback from './pages/Feedback';
import Coodashboard from './pages/Coodashboard';

import './css/style.css';
import './charts/ChartjsConfig';
import Create from './pages/Create';
import Manage from './pages/Manage';
import Instdashboard from './pages/Instdashboard';
import Report from './pages/Report';
import Manager from './pages/Manager';
import Instructor from './pages/Instructor';
import Registral from './pages/Registral';
import Customer from './pages/Customer';
import AllUser from './pages/AllUser';
import Course from './partials/Course';
import RoleManage from './pages/RoleManage';
import FeedCustomer from './pages/FeedCustomer';
import FeedStudent from './pages/FeedStudent';
import Account from './pages/Account';
import UpdateAcc from './pages/UpdateAcc';
import Notification from './pages/Notification';


function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Coodashboard" element={<Coodashboard />} />
      <Route path="/Appointment" element={<Appointment />} />
      <Route path="/Payment" element={<Payment />} />
      <Route path="/Feedback" element={<Feedback />} />
      <Route path="/Create" element={<Create />} />
      <Route path="/Manage" element={<Manage />} />
      <Route path="/Instdashboard" element={<Instdashboard />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/AllUser" element={<AllUser />} />
      <Route path="/Manager" element={<Manager />} />
      <Route path="/Instructor" element={<Instructor />} />
      <Route path="/Registral" element={<Registral />} />
      <Route path="/Customer" element={<Customer />} />
      <Route path="/Course" element={<Course />} />
      <Route path="/RoleManage" element={<RoleManage />} />
      <Route path="/FeedCustomer" element={< FeedCustomer/>} />
      <Route path="/FeedStudent" element={<FeedStudent />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/UpdateAcc" element={<UpdateAcc />} />
      <Route path="/Notification" element={<Notification />} />


    </Routes>
  );
}

export default App;