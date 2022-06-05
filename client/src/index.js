import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import App from './App/App.js';
import Login from './Auth/Login.js'
import Register from './Auth/Register'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
  <Routes>
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route exact path="/" element={<App/>} />
  </Routes>
</Router>
);

reportWebVitals();
