// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // TailwindCSS imports should be here
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);