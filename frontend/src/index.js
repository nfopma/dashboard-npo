import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Zorg dat dit naar de nieuwe App.js wijst
import reportWebVitals from './reportWebVitals';
// import { v4 as uuidv4 } from 'uuid'; // Deze import is niet nodig in index.js, maar in usePatientData.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
