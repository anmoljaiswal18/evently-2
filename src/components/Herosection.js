import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRegistration } from "../context/RegistrationContext";
export default function Herosection() {
    const { openRegistration } = useRegistration();
    return (_jsxs("div", { className: "relative w-full h-screen overflow-hidden flex items-center justify-center", children: [_jsx("video", { autoPlay: true, muted: true, loop: true, className: "absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-sm", children: _jsx("source", { src: "/images/invideo.mp4", type: "video/mp4" }) }), _jsxs("div", { className: "relative z-10 text-center text-white px-6", children: [_jsxs("div", { className: "flex justify-center items-center space-x-4 mb-4", children: [_jsx("img", { src: "/images/logo.png", alt: "Evently Logo", className: "h-16 sm:h-20" }), _jsx("img", { src: "/images/textlogo.png", alt: "Evently Text Logo", className: "h-12 sm:h-16" })] }), _jsx("h1", { className: "text-3xl sm:text-5xl font-bold uppercase tracking-wide", children: "DISCOVER. CONNECT. CELEBRATE." }), _jsx("p", { className: "mt-2 sm:mt-4 text-lg sm:text-xl", children: "Your All-in-One Destination for Fast, Affordable, and Seamless Event Booking & Fest Solutions!" }), _jsxs("div", { className: "mt-6 flex justify-center space-x-4", children: [_jsx("button", { onClick: openRegistration, className: "px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white", children: "List Your Event" }), _jsx("button", { onClick: openRegistration, className: "px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-blue-800 hover:text-white", children: "Find Your Ticket" })] })] })] }));
}
