import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import RegisterEmployee from './pages/registerEmployee';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/RegisterEmployee" element={<RegisterEmployee/>}/>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
