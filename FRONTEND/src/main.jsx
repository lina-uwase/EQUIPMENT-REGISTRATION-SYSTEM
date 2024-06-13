import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
// import { Swaggiffy } from 'swaggiffy'; // Using import

// const app = express(); // Ensure `app` is defined appropriately

// Instantiate Swaggiffy and integrate with your Express app
// new Swaggiffy().setupExpress(app).swaggiffy();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
