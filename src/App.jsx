 import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/manager/Dashboard';
import Login from './pages/Login';

import Appointment from './pages/manager/Appointment';
import Payment from './pages/manager/Payment';
import Feedback from './pages/coordinator/Feedback';
import Coodashboard from './pages/coordinator/Coodashboard';

import './css/style.css';
import './charts/ChartjsConfig';
import Create from './pages/instructor/Create';
import Manage from './pages/Manage';
import Instdashboard from './pages/instructor/Instdashboard';
import Report from './pages/manager/Report';
import Manager from './pages/manager/Manager';
import Instructor from './pages/manager/Instructor';
import Registral from './pages/manager/Registral';
import Customer from './pages/manager/Customer';
import AllUser from './pages/manager/AllUser';
import Course from './partials/Course';
import RoleManage from './pages/manager/RoleManage';
import FeedCustomer from './pages/FeedCustomer';
import FeedStudent from './pages/FeedStudent';
import Account from './pages/instructor/Account';
import UpdateAcc from './pages/instructor/UpdateAcc';
import Notification from './pages/instructor/Notification';


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
      <Route path="/manager/Dashboard" element={<Dashboard />} />
      <Route path="/manager/Report" element={<Report />} />
      <Route path="/manager/AllUser" element={<AllUser />} />
      <Route path="/manager/Manager" element={<Manager />} />
      <Route path="/manager/Instructor" element={<Instructor />} />
      <Route path="/manager/Registral" element={<Registral />} />
      <Route path="/manager/Customer" element={<Customer />} />
      <Route path="/manager/RoleManage" element={<RoleManage />} />

      <Route path="/coordinator/Coodashboard" element={<Coodashboard />} />
      <Route path="/coordinator/Appointment" element={<Appointment />} />
      <Route path="/coordinator/Payment" element={<Payment />} />
      <Route path="/coordinator/Feedback" element={<Feedback />} />
      



      <Route path="/instuctor/Create" element={<Create />} />
      <Route path="/instructor/Instdashboard" element={<Instdashboard />} />


      <Route path="/Manage" element={<Manage />} />
      <Route path="/Course" element={<Course />} />
      
      <Route path="/FeedCustomer" element={< FeedCustomer/>} />
      <Route path="/FeedStudent" element={<FeedStudent />} />
      <Route path="/instructor/Account" element={<Account />} />
      <Route path="/instructor/UpdateAcc" element={<UpdateAcc />} />
      <Route path="/instructor/Notification" element={<Notification />} />


    </Routes>
  );
}

export default App;