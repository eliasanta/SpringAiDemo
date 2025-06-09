import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import ImageGenerator from './components/ImageGenerator';
import Chat from './components/Chat';
import RecipeGenerator from './components/RecipeGenerator';

import './App.css';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="App">
      {isHome ? (
        <>
          <h1>Select with which AI to interact</h1>
          <nav>
            <Link to="/image-generator">
              <button>Image Generator</button>
            </Link>
            <Link to="/chat">
              <button>Chat</button>
            </Link>
            <Link to="/recipe-generator">
              <button>Recipe Generator</button>
            </Link>
          </nav>
        </>
      ) : (
        <Link to="/">
          <button>← Back to Home</button>
        </Link>
      )}

      <Routes>
        <Route path="/" element={null} />
        <Route path="/image-generator" element={<ImageGenerator />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
