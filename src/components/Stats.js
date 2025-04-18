"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const stats = [
    { id: 1, name: "Transactions every 24 hours", value: 44000000 },
    { id: 2, name: "Assets under holding", value: 119000000000 },
    { id: 3, name: "New users annually", value: 46000 },
];
export default function Stats() {
    return (_jsx("div", { className: "bg-blue-500 py-24 sm:py-32", children: _jsx("div", { className: "mx-auto max-w-7xl px-6 lg:px-8", children: _jsx("dl", { className: "grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3", children: stats.map((stat) => (_jsxs("div", { className: "mx-auto flex max-w-xs flex-col gap-y-4", children: [_jsx("dt", { className: "text-base/7 text-white", children: stat.name }), _jsx("dd", { className: "order-first text-3xl font-semibold tracking-tight text-yellow-400 sm:text-5xl", children: _jsx(AnimatedNumber, { targetValue: stat.value }) })] }, stat.id))) }) }) }));
}
// Animated Number Component
const AnimatedNumber = ({ targetValue }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                const increment = Math.ceil(targetValue / 100); // Adjust speed
                return prev + increment >= targetValue ? targetValue : prev + increment;
            });
        }, 200); // Speed of animation
        return () => clearInterval(interval);
    }, [targetValue]);
    return _jsx(motion.span, { animate: { opacity: [0, 1] }, children: count.toLocaleString() });
};
