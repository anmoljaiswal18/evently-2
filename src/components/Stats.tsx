"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { id: 1, name: "Transactions every 24 hours", value: 44000000 },
  { id: 2, name: "Assets under holding", value: 119000000000 },
  { id: 3, name: "New users annually", value: 46000 },
];

export default function Stats() {
  return (
    <div className="bg-blue-500 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base/7 text-white">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-yellow-400 sm:text-5xl">
                <AnimatedNumber targetValue={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// Animated Number Component
const AnimatedNumber = ({ targetValue }: { targetValue: number }) => {
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

  return <motion.span animate={{ opacity: [0, 1] }}>{count.toLocaleString()}</motion.span>;
};