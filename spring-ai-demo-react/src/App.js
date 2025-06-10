import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import ImageGenerator from './components/ImageGenerator';
import Chat from './components/Chat';
import RecipeGenerator from './components/RecipeGenerator';
import ChainWorkflow from './components/ChainWorkflow';

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
            <Link to="/chain-workflow">
              <button>Demo Chain Workflow</button>
            </Link>
          </nav>
        </>
      ) : (
        <Link to="/">
          <button>Home</button>
        </Link>
      )}

      <Routes>
        <Route path="/" element={null} />
        <Route path="/image-generator" element={<ImageGenerator />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/recipe-generator" element={<RecipeGenerator />} />
        <Route path="/chain-workflow" element={<ChainWorkflow />} />
        <Route path="*" element={<h2>Page not found</h2>} />
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
