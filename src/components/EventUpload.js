"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
        tag: "music", // Default tag
        bannerImage: "", // Empty string as default
    });
    const [imagePreview, setImagePreview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
    // Available event tags
    const eventTags = [
        "music", "holi", "diwali", "birthday",
        "aarti", "darshan", "festival", "concert",
        "conference", "workshop", "sports", "cultural"
    ];
    // Handle input changes for text and number fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Number(value) : value,
        }));
    };
    // Handle file upload for banner image
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Make sure reader.result is string before assigning
                const base64String = reader.result;
                setFormData(prev => ({
                    ...prev,
                    bannerImage: base64String
                }));
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // API call
            const res = await fetch("/api/uploadEvent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (res.ok) {
                setSubmitMessage({ type: "success", text: "✅ " + result.message });
                // Reset form after successful submission
                setFormData({
                    name: "",
                    description: "",
                    price: 0,
                    startDate: "",
                    endDate: "",
                    city: "",
                    state: "",
                    tag: "music",
                    bannerImage: ""
                });
                setImagePreview("");
            }
            else {
                setSubmitMessage({ type: "error", text: "❌ Upload failed: " + result.error });
            }
        }
        catch (error) {
            console.error("Error uploading event:", error);
            setSubmitMessage({ type: "error", text: "❌ Error uploading event." });
        }
        finally {
            setIsSubmitting(false);
            // Clear message after 5 seconds
            setTimeout(() => setSubmitMessage({ type: "", text: "" }), 5000);
        }
    };
    return (_jsxs("div", { className: "relative overflow-auto w-full min-h-screen flex justify-center items-center py-8 mt-10", children: [_jsx("video", { autoPlay: true, muted: true, loop: true, className: "absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-sm", children: _jsx("source", { src: "/images/invideo.mp4", type: "video/mp4" }) }), _jsxs("div", { className: "max-w-3xl w-full z-10 px-4", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white", children: "Create Your Event" }), _jsx("p", { className: "text-gray-200 mt-2", children: "Fill in the details to share your event with others" })] }), _jsxs("div", { className: "bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden", children: [_jsx("div", { className: "h-52 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative flex items-center justify-center", children: imagePreview ? (_jsx("img", { src: imagePreview, alt: "Event banner preview", className: "w-full h-full object-cover" })) : (_jsxs("div", { className: "text-center text-blue-600", children: [_jsxs("svg", { className: "w-16 h-16 mx-auto", fill: "currentColor", viewBox: "0 0 20 20", children: [_jsx("path", { fillRule: "evenodd", d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z", clipRule: "evenodd" }), _jsx("path", { d: "M8.5 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" }), _jsx("path", { fillRule: "evenodd", d: "M4 15h12l-3.5-5-2.5 3-2-2.5L4 15z", clipRule: "evenodd" })] }), _jsx("p", { className: "font-medium", children: "Your event banner will appear here" })] })) }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [submitMessage.text && (_jsx("div", { className: `mb-4 p-3 rounded-lg text-center ${submitMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: submitMessage.text })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Event Name" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black", placeholder: "Enter a catchy name for your event", required: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Description" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleChange, rows: 4, className: "w-full px-4 py-3 rounded-lg border border-black text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "Describe your event, activities, highlights, etc.", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Start Date" }), _jsx("input", { type: "date", name: "startDate", value: formData.startDate, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "End Date" }), _jsx("input", { type: "date", name: "endDate", value: formData.endDate, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Price (\u20B9)" }), _jsx("input", { type: "number", name: "price", value: formData.price, onChange: handleChange, min: "0", step: "1", className: "w-full px-4 py-3 rounded-lg border border-black text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "0 for free events", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Event Tag" }), _jsx("select", { name: "tag", value: formData.tag, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500", required: true, children: eventTags.map(tag => (_jsx("option", { value: tag, children: tag.charAt(0).toUpperCase() + tag.slice(1) }, tag))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "State" }), _jsx("input", { type: "text", name: "state", value: formData.state, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "State", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "City" }), _jsx("input", { type: "text", name: "city", value: formData.city, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500", placeholder: "City", required: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Event Banner" }), _jsxs("div", { className: "border-2 border-dashed border-black text-black rounded-lg p-4 text-center hover:border-blue-500 transition-colors", children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "hidden", id: "banner-upload", required: !imagePreview }), _jsxs("label", { htmlFor: "banner-upload", className: "cursor-pointer flex flex-col items-center justify-center", children: [_jsx("svg", { className: "w-12 h-12 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }), _jsx("span", { className: "mt-2 text-gray-600", children: "Click to upload event banner" }), _jsx("span", { className: "text-xs text-gray-500 mt-1", children: "JPG, PNG or GIF (Max 5MB)" })] })] })] })] }), _jsx("div", { className: "mt-8", children: _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition duration-300 shadow-md flex items-center justify-center", children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "Processing..."] })) : ("Create Event") }) })] })] })] })] }));
}
