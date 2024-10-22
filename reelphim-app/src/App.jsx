import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import GenrePage from './pages/GenrePage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white flex flex-col">
        <Header />
        <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/genres" element={<GenrePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;