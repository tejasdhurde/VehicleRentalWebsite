import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../assets/MainLayout.css'; // ✅ Import custom layout styling

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content container py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

