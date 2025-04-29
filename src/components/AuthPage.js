import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// AuthPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
export default function AuthPage({ onAuthSuccess }) {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    // Initialize form with proper generic type
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // Use SubmitHandler with the generic type
    const onSubmit = async (data) => {
        try {
            if (isRegister) {
                const userId = uuidv4();
                const newUser = {
                    ...data,
                    userId,
                };
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
                    alert("✅ Registered Successfully!");
                    // Notify parent component about successful auth
                    if (onAuthSuccess) {
                        onAuthSuccess({
                            userId: userId,
                            name: data.name,
                            email: data.email
                        });
                    }
                    // Navigate to main page after successful registration
                    navigate("/main");
                }
                else {
                    alert("❌ Error: " + result.error);
                }
            }
            else {
                // For login (you can connect login API later)
                alert("✅ Logged In Successfully!");
                // Notify parent component about successful auth
                if (onAuthSuccess) {
                    onAuthSuccess({
                        email: data.email,
                        // For login, we may not have these values yet; they would come from your API
                        name: data.name,
                        userId: "user-" + Math.random().toString(36).substr(2, 9) // Temporary ID for demo
                    });
                }
                // Navigate to main page after successful login
                navigate("/main");
            }
        }
        catch (err) {
            console.error("Authentication Error:", err);
            alert("❌ Something went wrong.");
        }
        reset();
    };
    return (_jsx("div", { className: "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600", children: _jsxs(motion.div, { className: "w-full max-w-lg p-10 space-y-6 bg-white shadow-2xl rounded-2xl relative", initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [_jsx("h2", { className: "text-center text-3xl font-bold text-gray-800", children: isRegister ? "Create an Account" : "Login to Evently" }), _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit(onSubmit), children: [isRegister && (_jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium", children: "Full Name" }), _jsx("input", { ...register("name", { required: isRegister }), type: "text", className: "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-black text-white", placeholder: "John Doe" }), errors.name && _jsx("p", { className: "text-red-500 text-sm", children: "Name is required" })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium", children: "Email" }), _jsx("input", { ...register("email", { required: true, pattern: /^\S+@\S+$/i }), type: "email", className: "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-black text-white", placeholder: "example@email.com" }), errors.email && _jsx("p", { className: "text-red-500 text-sm", children: "Valid email is required" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium", children: "Password" }), _jsx("input", { ...register("password", { required: true, minLength: 6 }), type: "password", className: "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 bg-black text-white", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), errors.password && _jsx("p", { className: "text-red-500 text-sm", children: "Min 6 characters required" })] }), _jsx(motion.button, { type: "submit", className: "w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:opacity-90 transition", whileTap: { scale: 0.95 }, children: isRegister ? "Sign Up" : "Login" })] }), _jsxs("p", { className: "text-center text-gray-700", children: [isRegister ? "Already have an account?" : "Don't have an account?", " ", _jsx("button", { className: "text-purple-600 font-semibold hover:underline", onClick: () => setIsRegister(!isRegister), children: isRegister ? "Login" : "Sign Up" })] })] }) }));
}
