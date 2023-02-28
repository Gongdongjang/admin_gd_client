import React, { useState, useEffect }  from 'react';
import {  BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Main from './pages/main.js';
import Header from './pages/Header';
import Routers from './pages/Routers';
import Home from './pages/Home';

function App() {

  return (
    <div>
      <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/main/*"  element={<Main />} />
                    <Route path="/home"  element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
