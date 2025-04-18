import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css'; 
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { RegistrationProvider } from "./context/RegistrationContext";

const rootElement = document.getElementById('root');

if (rootElement) { // ✅ Check that root element exists
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
      <RegistrationProvider>
        <Navbar/>
        <App />
        <Footer/>
      </RegistrationProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
