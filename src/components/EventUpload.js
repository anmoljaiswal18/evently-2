"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export default function EventUpload() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        startDate: "",
        endDate: "",
        city: "",
        state: "",
        interest: "",
    });
    const [imageBase64, setImageBase64] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImageBase64(base64String);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            image: imageBase64,
        };
        try {
            const res = await fetch("/api/uploadEvent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });
            const result = await res.json();
            if (res.ok) {
                alert("✅ " + result.message);
            }
            else {
                alert("❌ Upload failed: " + result.error);
            }
        }
        catch (error) {
            console.error("Error uploading event:", error);
            alert("❌ Error uploading event.");
        }
    };
    return (_jsxs("div", { className: "relative overflow-hidden w-full h-screen flex justify-center items-center", children: [_jsx("video", { autoPlay: true, muted: true, loop: true, className: "absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-sm", children: _jsx("source", { src: "/images/invideo.mp4", type: "video/mp4" }) }), _jsxs("form", { onSubmit: handleSubmit, className: "bg-blue-400 p-6 shadow-lg rounded-lg w-full max-w-lg z-10 mt-2 mb-2", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-800 mb-4 text-center", children: "Upload Your Event" }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-black", children: "Event Name" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", placeholder: "Enter event name", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Event Description" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", placeholder: "Enter event description", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Price (\u20B9)" }), _jsx("input", { type: "number", name: "price", value: formData.price, onChange: handleChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", placeholder: "Enter event price", required: true })] }), _jsxs("div", { className: "mb-4 flex space-x-4", children: [_jsxs("div", { className: "w-1/2", children: [_jsx("label", { className: "block text-gray-700", children: "Start Date" }), _jsx("input", { type: "date", name: "startDate", value: formData.startDate, onChange: handleChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", required: true })] }), _jsxs("div", { className: "w-1/2", children: [_jsx("label", { className: "block text-gray-700", children: "End Date" }), _jsx("input", { type: "date", name: "endDate", value: formData.endDate, onChange: handleChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", required: true })] })] }), _jsxs("div", { className: "mb-4 flex space-x-4", children: [_jsxs("div", { className: "w-1/2", children: [_jsx("label", { className: "block text-gray-700", children: "State" }), _jsx("input", { type: "text", name: "state", value: formData.state, onChange: handleChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", placeholder: "Enter state", required: true })] }), _jsxs("div", { className: "w-1/2", children: [_jsx("label", { className: "block text-gray-700", children: "City" }), _jsx("input", { type: "text", name: "city", value: formData.city, onChange: handleChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", placeholder: "Enter city", required: true })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Interest/Category" }), _jsx("input", { type: "text", name: "interest", value: formData.interest, onChange: handleChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", placeholder: "E.g. Music, Tech, Sports", required: true })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block text-gray-700", children: "Event Image" }), _jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300", required: true })] }), _jsx("button", { type: "submit", className: "w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition", children: "Upload Event" })] })] }));
}
