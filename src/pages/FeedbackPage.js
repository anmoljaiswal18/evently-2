'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
const dummyFeedbacks = [
    {
        id: '1',
        name: 'Aarav Singh',
        rating: 5,
        comment: 'Evently saved me so much money on intercity rides. Truly a game-changer!',
        imageUrl: '/images/feedback1.jpeg',
    },
    {
        id: '2',
        name: 'Priya Sharma',
        rating: 4,
        comment: 'Very smooth experience booking buses and local trips. Love the UI!',
        imageUrl: '/images/feedback2.jpg',
    },
    {
        id: '3',
        name: 'Ravi Patel',
        rating: 5,
        comment: 'Traveling with Evently is always fast, reliable, and super affordable!',
        imageUrl: '/images/feedback3.jpeg',
    },
];
export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState([]);
    useEffect(() => {
        // In real app, fetch from backend
        setFeedbacks(dummyFeedbacks);
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-sky-100 to-lime-100 py-10 px-6 mt-10", children: [_jsxs("h1", { className: "text-4xl font-bold text-center mb-10 text-green-800", children: ["What Our Users Say About ", _jsx("span", { className: "text-blue-600", children: "Evently" })] }), _jsx("div", { className: "max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3", children: feedbacks.map(({ id, name, rating, comment, imageUrl }) => (_jsx("div", { className: "bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300", children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("img", { src: imageUrl, alt: name, className: "w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-200" }), _jsx("h2", { className: "text-lg font-semibold text-gray-800", children: name }), _jsxs("div", { className: "text-yellow-500 text-sm mt-1", children: ['★'.repeat(rating), '☆'.repeat(5 - rating)] }), _jsx("p", { className: "text-gray-600 text-sm mt-4 text-center", children: comment })] }) }, id))) })] }));
}
