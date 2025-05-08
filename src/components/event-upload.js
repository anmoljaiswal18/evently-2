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
        tag: "music",
    });
    const [bannerFile, setBannerFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
    const eventTags = [
        "music", "holi", "diwali", "birthday",
        "aarti", "darshan", "festival", "concert",
        "conference", "workshop", "sports", "cultural"
    ];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? Math.max(0, Number(value)) : value,
        }));
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
                setSubmitMessage({ type: "error", text: "❌ Only JPG, PNG, and GIF files are allowed." });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setSubmitMessage({ type: "error", text: "❌ File size must be less than 5MB." });
                return;
            }
            setBannerFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!bannerFile) {
                setSubmitMessage({ type: "error", text: "❌ Please upload a banner image." });
                return;
            }
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("description", formData.description);
            formDataToSend.append("price", formData.price.toString());
            formDataToSend.append("date", `${formData.startDate} to ${formData.endDate}`);
            formDataToSend.append("location", `${formData.city}, ${formData.state}`);
            formDataToSend.append("category", formData.tag);
            formDataToSend.append("organizer", "admin"); // Replace with actual user if needed
            formDataToSend.append("bannerImage", bannerFile);
            const res = await fetch("http://localhost:5000/api/event-upload", {
                method: "POST",
                body: formDataToSend,
            });
            if (!res.ok) {
                setSubmitMessage({ type: "error", text: `❌ Error: ${res.statusText}` });
                return;
            }
            const result = await res.json();
            setSubmitMessage({ type: "success", text: "✅ " + result.message });
            setFormData({
                name: "",
                description: "",
                price: 0,
                startDate: "",
                endDate: "",
                city: "",
                state: "",
                tag: "music",
            });
            setBannerFile(null);
            setImagePreview("");
        }
        catch (error) {
            console.error("Error uploading event:", error);
            setSubmitMessage({ type: "error", text: "❌ Error uploading event." });
        }
        finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage({ type: "", text: "" }), 5000);
        }
    };
    return (_jsxs("div", { className: "relative overflow-auto w-full min-h-screen flex justify-center items-center py-8 mt-10", children: [_jsx("video", { autoPlay: true, muted: true, loop: true, className: "absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-sm", children: _jsx("source", { src: "/images/invideo.mp4", type: "video/mp4" }) }), _jsxs("div", { className: "max-w-3xl w-full z-10 px-4", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white", children: "Create Your Event" }), _jsx("p", { className: "text-gray-200 mt-2", children: "Fill in the details to share your event with others" })] }), _jsxs("div", { className: "bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden", children: [_jsx("div", { className: "h-52 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative flex items-center justify-center", children: imagePreview ? (_jsx("img", { src: imagePreview, alt: "Event banner preview", className: "w-full h-full object-cover" })) : (_jsxs("div", { className: "text-center text-blue-600", children: [_jsxs("svg", { className: "w-16 h-16 mx-auto", fill: "currentColor", viewBox: "0 0 20 20", children: [_jsx("path", { fillRule: "evenodd", d: "M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z", clipRule: "evenodd" }), _jsx("path", { d: "M8.5 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" }), _jsx("path", { fillRule: "evenodd", d: "M4 15h12l-3.5-5-2.5 3-2-2.5L4 15z", clipRule: "evenodd" })] }), _jsx("p", { className: "font-medium", children: "Your event banner will appear here" })] })) }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [submitMessage.text && (_jsx("div", { className: `mb-4 p-3 rounded-lg text-center ${submitMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`, children: submitMessage.text })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Event Name" }), _jsx("input", { type: "text", name: "name", value: formData.name, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600", placeholder: "Enter a catchy name", required: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Description" }), _jsx("textarea", { name: "description", value: formData.description, onChange: handleChange, rows: 4, className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600", placeholder: "Describe your event", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Start Date" }), _jsx("input", { type: "date", name: "startDate", value: formData.startDate, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "End Date" }), _jsx("input", { type: "date", name: "endDate", value: formData.endDate, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Price (\u20B9)" }), _jsx("input", { type: "number", name: "price", value: formData.price, onChange: handleChange, min: "0", className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600", placeholder: "0 for free", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Event Tag" }), _jsx("select", { name: "tag", value: formData.tag, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600", required: true, children: eventTags.map(tag => (_jsx("option", { value: tag, children: tag.charAt(0).toUpperCase() + tag.slice(1) }, tag))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "State" }), _jsx("input", { type: "text", name: "state", value: formData.state, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600", placeholder: "Enter state", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "City" }), _jsx("input", { type: "text", name: "city", value: formData.city, onChange: handleChange, className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600", placeholder: "Enter city", required: true })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-gray-700 font-medium mb-2", children: "Event Banner Image" }), _jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "w-full px-4 py-3 rounded-lg border border-black text-gray-600" })] })] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400", children: isSubmitting ? "Submitting..." : "Upload Event" })] })] })] })] }));
}
