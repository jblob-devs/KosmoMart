import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { StartScreen, SecondScreen, TutorialScreen, EncounterScreen } from './screens';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/second" element={<SecondScreen />} />
        <Route path="/tutorial" element={<TutorialScreen />} />
        <Route path="/encounter" element={<EncounterScreen />} />
      </Routes>
    </Router>
  );
}
export default App;
