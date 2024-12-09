import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      <Header />
      {/* New full-width content section */}
      <div className="w-full bg-gray-800 p-6">
        <div className="text-center">
          <Dashboard />
        </div>
      </div>

      {/* Main layout with sidebars */}
      <div className="flex-grow flex">
        {/* Left sidebar */}
        <aside className="hidden lg:block w-64 p-4">
        </aside>
        {/* Main content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-8 sm:space-y-10 lg:space-y-12">
          <Outlet />
        </main>

        {/* Right sidebar */}
        <aside className="hidden lg:block w-64 p-4">
        </aside>
      </div>
      <Footer />
    </div>

  );
};

export default MainLayout;