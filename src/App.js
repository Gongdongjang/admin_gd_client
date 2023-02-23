import React, { useState, useEffect }  from 'react';
import './App.css';
import Header from './pages/Header';
import Routers from './pages/Routers';

function App() {

  return (
    <div>
      <Header />
      <Routers/>
    </div>
  );
}

export default App;
