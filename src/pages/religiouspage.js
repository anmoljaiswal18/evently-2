"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { format } from "date-fns";
export default function ReligiousEventsPage() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        date: "all",
        price: "all",
        location: "all"
    });
    const formatEventDate = (start, end) => {
        const s = new Date(start);
        const e = new Date(end);
        if (start === end)
            return format(s, "MMM d, yyyy");
        return `${format(s, "MMM d")} - ${format(e, "MMM d, yyyy")}`;
    };
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/events");
                const data = await res.json();
                const mapped = data.map((event) => ({
                    id: event._id,
                    name: event.name,
                    description: event.description,
                    price: event.price,
                    startDate: event.date.split(" to ")[0],
                    endDate: event.date.split(" to ")[1] || event.date.split(" to ")[0],
                    city: event.location?.split(",")[0]?.trim() || "N/A",
                    state: event.location?.split(",")[1]?.trim() || "N/A",
                    tag: event.category,
                    image: `http://localhost:5000/${event.bannerImage}`,
                }));
                const religiousTags = ["religious", "aarti", "darshan"];
                const religiousEvents = mapped.filter(e => religiousTags.includes(e.tag.toLowerCase()));
                setEvents(religiousEvents);
                setFilteredEvents(religiousEvents);
                setLoading(false);
            }
            catch (err) {
                console.error("Failed to fetch religious events", err);
                setError("Unable to load events.");
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);
    useEffect(() => {
        let filtered = [...events];
        const today = new Date();
        const weekLater = new Date();
        const monthLater = new Date();
        weekLater.setDate(today.getDate() + 7);
        monthLater.setMonth(today.getMonth() + 1);
        if (filters.date !== "all") {
            filtered = filtered.filter(event => {
                const eventDate = new Date(event.startDate);
                if (filters.date === "today")
                    return eventDate.toDateString() === today.toDateString();
                if (filters.date === "this-week")
                    return eventDate >= today && eventDate <= weekLater;
                if (filters.date === "this-month")
                    return eventDate >= today && eventDate <= monthLater;
                return true;
            });
        }
        if (filters.price === "free") {
            filtered = filtered.filter(e => e.price === 0);
        }
        else if (filters.price === "paid") {
            filtered = filtered.filter(e => e.price > 0);
        }
        if (filters.location !== "all") {
            filtered = filtered.filter(e => e.city === filters.location);
        }
        setFilteredEvents(filtered);
    }, [filters, events]);
    const handleFilterChange = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };
    const uniqueLocations = Array.from(new Set(events.map(e => e.city))).filter(Boolean);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-orange-100 to-green-100 p-6", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-6 text-orange-700", children: "Religious Events" }), _jsxs("div", { className: "bg-orange-400 rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-black ", children: "Date" }), _jsxs("select", { value: filters.date, onChange: e => handleFilterChange("date", e.target.value), className: "w-full p-2 border rounded mt-1 bg-orange-400", children: [_jsx("option", { value: "all", children: "Any Time" }), _jsx("option", { value: "today", children: "Today" }), _jsx("option", { value: "this-week", children: "This Week" }), _jsx("option", { value: "this-month", children: "This Month" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-black", children: "Price" }), _jsxs("select", { value: filters.price, onChange: e => handleFilterChange("price", e.target.value), className: "w-full p-2 border rounded mt-1 bg-orange-400", children: [_jsx("option", { value: "all", children: "All" }), _jsx("option", { value: "free", children: "Free" }), _jsx("option", { value: "paid", children: "Paid" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-black", children: "Location" }), _jsxs("select", { value: filters.location, onChange: e => handleFilterChange("location", e.target.value), className: "w-full p-2 border rounded mt-1 bg-orange-400", children: [_jsx("option", { value: "all", children: "All" }), uniqueLocations.map(loc => (_jsx("option", { value: loc, children: loc }, loc)))] })] })] }), loading ? (_jsx("div", { className: "text-center py-20 text-orange-600", children: "Loading..." })) : error ? (_jsx("div", { className: "text-red-600 text-center py-10", children: error })) : filteredEvents.length === 0 ? (_jsx("div", { className: "text-center py-10 text-gray-500", children: "No religious events found." })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", children: filteredEvents.map(event => (_jsxs("div", { className: "bg-white rounded-xl shadow-md overflow-hidden", children: [_jsx("img", { src: event.image, alt: event.name, className: "w-full h-48 object-cover" }), _jsxs("div", { className: "p-4", children: [_jsx("h2", { className: "text-xl font-semibold text-green-800 mb-1", children: event.name }), _jsx("p", { className: "text-sm text-gray-600 mb-2", children: formatEventDate(event.startDate, event.endDate) }), _jsx("p", { className: "text-sm text-gray-700 mb-3 line-clamp-2", children: event.description }), _jsxs("div", { className: "flex justify-between text-sm text-gray-600", children: [_jsx("span", { children: event.city }), _jsx("span", { children: event.price === 0 ? "Free" : `₹${event.price}` })] })] })] }, event.id))) }))] }));
}
