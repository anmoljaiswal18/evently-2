import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    ReactDOM.createRoot(rootElement).render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsxs(RegistrationProvider, { children: [_jsx(Navbar, {}), _jsx(App, {}), _jsx(Footer, {})] }) }) }));
}
else {
    console.error("Root element not found");
}
