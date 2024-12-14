import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/header';
import './App.css';
import Footer from './components/Footer';
import SummaryApi from './common/index';
import Context from './context';
import { useDispatch } from 'react-redux';

function App() {
  // const dispatch = useDispatch()
  // const [userDetails, setUserDetails] = useState(null); // Store user details in state
  // const [loading, setLoading] = useState(true); // To manage loading state
  // const [error, setError] = useState(null); // To handle errors

  // // Fetch user details with token
  // const fetchUserDetails = async () => {
  //   const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
  //   if (!token) {
  //     // setError('No token found!');
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const dataResponse = await fetch(SummaryApi.current_user(token).url, {
  //       method: SummaryApi.current_user(token).method,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       credentials: 'include', 
  //     });

  //     if (!dataResponse.ok) {
  //       // throw new Error('Failed to fetch user details');
  //     }

  //     const dataApi = await dataResponse.json();
  //     // setUserDetails(dataApi); 
  //     if(dataApi.success){
  //       dispatch(setUserDetails(dataApi.data))
  //     }
  //   } catch (err) {
  //     setError(err.message); // Handle any errors during fetch
  //   } finally {
  //     setLoading(false); // Hide loading state after fetch is complete
  //   }
  // };

  // useEffect(() => {
  //   fetchUserDetails();
  // }, []); // Run once when the component mounts

  return (
    <>
      
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
    </>
  );
}

export default App;
