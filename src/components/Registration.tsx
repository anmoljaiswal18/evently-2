"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid"; // ✅ Import UUID

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (isRegister) {
      const userId = uuidv4();
  
      const newUser = {
        ...data,
        userId,
      };
  
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        const result = await res.json();
  
        if (res.ok) {
          alert("✅ Registered Successfully!\nYour User ID: " + result.userId);
        } else {
          alert("❌ Error: " + result.error);
        }
      } catch (err) {
        console.error("Registration Error:", err);
        alert("❌ Something went wrong while registering.");
      }
    } else {
      // For now, simple login (you can connect login API later)
      alert("✅ Logged In Successfully!");
    }
  
    reset();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="w-full max-w-lg p-10 space-y-6 bg-white shadow-2xl rounded-2xl relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-3xl font-bold text-gray-800">
          {isRegister ? "Create an Account" : "Login to Evently"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {isRegister && (
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                {...register("name", { required: isRegister })}
                type="text"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-black"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-black text-white"
              placeholder="example@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">Valid email is required</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-black text-white"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm">Min 6 characters required</p>}
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            whileTap={{ scale: 0.95 }}
          >
            {isRegister ? "Sign Up" : "Login"}
          </motion.button>
        </form>

        <p className="text-center text-gray-700">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-purple-600 font-semibold hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
  