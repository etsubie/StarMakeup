import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/header';
import './App.css'
import Footer from './components/Footer';

function App() {

  return (
      <>
      <Header />
      <main className='min-h-[calc(100vh-100px)]'>
      <Outlet />
      </main>
      <Footer />
      </>
  );
}

export default App
