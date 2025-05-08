import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import Registration from "./AuthPage";
import { useRegistration } from "../context/RegistrationContext";
const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isOpen, closeRegistration, openRegistration } = useRegistration();
    const [user, setUser] = useState(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    // Check for authenticated user on component mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setUserMenuOpen(false);
        navigate("/");
    };
    // Function to handle login/register
    const handleAuthSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        closeRegistration();
    };
    return (_jsxs("header", { className: "fixed top-0 left-0 w-full bg-blue-600 shadow-md z-50", children: [_jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4", children: [_jsx(Link, { to: "/", className: "text-lg font-semibold text-gray-900", children: _jsx("img", { src: "/images/logo.png", alt: "Evently Logo", className: "h-10 w-auto" }) }), _jsxs("nav", { className: "hidden lg:flex gap-x-8", children: [_jsx(Link, { to: "/", className: "text-white hover:text-yellow-400", children: "Home" }), _jsx(Link, { to: "/religious-page", className: "text-white hover:text-yellow-400", children: "Religious Event" }), _jsx(Link, { to: "/", className: "text-white hover:text-yellow-400", children: "Add Your Venue" }), _jsx(Link, { to: "/feedback-view", className: "text-white hover:text-yellow-400", children: "Wall of Love" })] }), _jsx("div", { className: "hidden lg:flex gap-x-4", children: user ? (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setUserMenuOpen(!userMenuOpen), className: "flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white", children: [_jsx(UserCircleIcon, { className: "h-6 w-6" }), _jsx("span", { children: user.name || user.email.split('@')[0] })] }), userMenuOpen && (_jsxs("div", { className: "absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50", children: [_jsxs("div", { className: "mb-4 border-b pb-2", children: [_jsx("p", { className: "font-bold", children: user.name || "User" }), _jsx("p", { className: "text-sm text-gray-600", children: user.email }), user.userId && _jsxs("p", { className: "text-xs text-gray-500", children: ["ID: ", user.userId] })] }), _jsx("button", { onClick: handleLogout, className: "w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600", children: "Logout" })] }))] })) : (_jsx(_Fragment, { children: _jsx("button", { onClick: openRegistration, className: "px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white", children: "Login/SignUp" }) })) }), _jsx("button", { className: "lg:hidden", onClick: () => setMobileMenuOpen(true), children: _jsx(Bars3Icon, { className: "h-8 w-8 text-black" }) })] }), _jsx(Dialog, { open: mobileMenuOpen, onClose: () => setMobileMenuOpen(false), className: "lg:hidden", children: _jsxs("div", { className: "fixed inset-y-0 right-0 w-64 bg-blue-600 shadow-xl p-4 flex flex-col z-50", children: [_jsx("button", { onClick: () => setMobileMenuOpen(false), className: "self-end mb-4", children: _jsx(XMarkIcon, { className: "h-8 w-8 text-black" }) }), _jsxs("nav", { className: "flex flex-col space-y-4", children: [_jsx(Link, { to: "/", className: "text-white hover:text-yellow-400", children: "Home" }), _jsx(Link, { to: "/religious-page", className: "text-white hover:text-yellow-400", children: "Religious Event" }), _jsx(Link, { to: "/", className: "text-white hover:text-yellow-400", children: "Add Your Venue" }), _jsx(Link, { to: "/feedback-view", className: "text-white hover:text-yellow-400", children: "Wall of Love" })] }), _jsx("div", { className: "mt-auto flex flex-col gap-2", children: user ? (_jsxs("div", { className: "bg-white rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(UserCircleIcon, { className: "h-6 w-6" }), _jsx("span", { className: "font-bold", children: user.name || user.email.split('@')[0] })] }), _jsx("p", { className: "text-sm text-gray-600", children: user.email }), user.userId && _jsxs("p", { className: "text-xs text-gray-500", children: ["ID: ", user.userId] }), _jsx("button", { onClick: handleLogout, className: "w-full mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600", children: "Logout" })] })) : (_jsx(_Fragment, { children: _jsx("button", { onClick: openRegistration, className: "px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white", children: "Login/SignUp" }) })) })] }) }), _jsx(Dialog, { open: isOpen, onClose: closeRegistration, className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50", children: _jsxs("div", { className: "bg-white p-6 rounded-lg shadow-lg w-96 relative", children: [_jsx("button", { onClick: closeRegistration, className: "absolute top-2 right-2", children: _jsx(XMarkIcon, { className: "h-6 w-6 text-black" }) }), _jsx(Registration, { onAuthSuccess: handleAuthSuccess })] }) })] }));
};
export default Navbar;
