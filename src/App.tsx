import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
