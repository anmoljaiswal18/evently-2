"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { format } from "date-fns";
export default function ReligiousEventsPage() {
    // Sample events data (in a real app, this would come from an API)
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    // Filter states
    const [filters, setFilters] = useState({
        tag: "all",
        location: "all",
        dateRange: "all",
        sortBy: "date-asc",
    });
    // Toggle states for mobile filters
    const [showFilters, setShowFilters] = useState(false);
    // Available tags and locations (would be dynamic in a real app)
    const eventTags = [
        "all", "aarti", "jaagran", "puja", "darshan",
        "kirtan", "satsang", "katha", "yatra",
        "bhajan", "havan", "festival", "mandir", "ghat"
    ];
    const locations = [
        "all", "Varanasi", "Ayodhya", "Haridwar", "Rishikesh",
        "Mathura", "Vrindavan", "Prayagraj", "Amritsar",
        "Tirupati", "Katra", "Dwarka", "Puri"
    ];
    // Fetch events data
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                // In a real application, you would fetch from an API
                // const response = await fetch('/api/events');
                // const data = await response.json();
                // Religious events data
                const religiousEvents = [
                    {
                        id: "1",
                        name: "Ganga Aarti at Dashashwamedh Ghat",
                        description: "Experience the divine Ganga Aarti ceremony at the famous Dashashwamedh Ghat with priests performing the sacred ritual with fire, incense, flowers, and bells as the sun sets over the holy Ganges.",
                        price: 0,
                        startDate: "2025-05-10",
                        endDate: "2025-05-10",
                        city: "Varanasi",
                        state: "Uttar Pradesh",
                        tag: "aarti",
                        image: "/images/gangaarti.jpeg",
                    },
                    {
                        id: "2",
                        name: "Ram Mandir Darshan",
                        description: "Visit the newly constructed Ram Mandir in Ayodhya for a spiritual darshan of Lord Ram. The temple complex features intricate carvings and sculptures depicting scenes from the Ramayana.",
                        price: 0,
                        startDate: "2025-05-15",
                        endDate: "2025-05-15",
                        city: "Ayodhya",
                        state: "Uttar Pradesh",
                        tag: "darshan",
                        image: "/images/ramamndir.jpeg",
                    },
                    {
                        id: "3",
                        name: "Mata Vaishno Devi Yatra",
                        description: "Join a guided pilgrimage to the holy shrine of Mata Vaishno Devi. The journey includes a trek up the mountain and darshan of the sacred cave temple.",
                        price: 1200,
                        startDate: "2025-06-05",
                        endDate: "2025-06-07",
                        city: "Katra",
                        state: "Jammu & Kashmir",
                        tag: "yatra",
                        image: "/images/Vaishnodevi.avif",
                    },
                    {
                        id: "4",
                        name: "Mahashivratri Jaagran",
                        description: "Participate in an all-night spiritual vigil (jaagran) on Mahashivratri with continuous prayers, bhajans, and meditation dedicated to Lord Shiva.",
                        price: 0,
                        startDate: "2025-03-11",
                        endDate: "2025-03-12",
                        city: "Haridwar",
                        state: "Uttarakhand",
                        tag: "jaagran",
                        image: "/images/jagran.jpg",
                    },
                    {
                        id: "5",
                        name: "Navratri Durga Puja Pandal",
                        description: "Visit the grand Durga Puja pandal during Navratri featuring elaborate decorations, a magnificent Durga idol, and continuous cultural performances.",
                        price: 0,
                        startDate: "2025-10-05",
                        endDate: "2025-10-14",
                        city: "Prayagraj",
                        state: "Uttar Pradesh",
                        tag: "puja",
                        image: "/api/placeholder/800/400",
                    },
                    {
                        id: "6",
                        name: "Tirupati Balaji Darshan",
                        description: "Special early morning VIP darshan of Lord Venkateshwara at the famous Tirupati Balaji Temple with prasadam and guided temple tour.",
                        price: 500,
                        startDate: "2025-07-15",
                        endDate: "2025-07-15",
                        city: "Tirupati",
                        state: "Andhra Pradesh",
                        tag: "darshan",
                        image: "/api/placeholder/800/400",
                    },
                    {
                        id: "7",
                        name: "Jagannath Rath Yatra",
                        description: "Be part of the ancient Rath Yatra festival where Lord Jagannath, Balabhadra and Subhadra travel in grand chariots from the main temple to Gundicha Temple.",
                        price: 0,
                        startDate: "2025-07-01",
                        endDate: "2025-07-09",
                        city: "Puri",
                        state: "Odisha",
                        tag: "festival",
                        image: "/api/placeholder/800/400",
                    },
                    {
                        id: "8",
                        name: "Kashi Vishwanath Temple Complex Tour",
                        description: "Guided spiritual tour of the newly renovated Kashi Vishwanath Temple complex with special darshan of Lord Shiva and explanation of the temple's history.",
                        price: 300,
                        startDate: "2025-05-20",
                        endDate: "2025-05-20",
                        city: "Varanasi",
                        state: "Uttar Pradesh",
                        tag: "mandir",
                        image: "/api/placeholder/800/400",
                    }
                ];
                setEvents(religiousEvents);
                setFilteredEvents(religiousEvents);
                setLoading(false);
            }
            catch (err) {
                console.error("Error fetching events:", err);
                setError("Failed to load religious events. Please try again later.");
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);
    // Apply filters
    useEffect(() => {
        let result = [...events];
        // Apply search filter
        if (searchQuery) {
            result = result.filter(event => event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Apply tag filter
        if (filters.tag !== "all") {
            result = result.filter(event => event.tag === filters.tag);
        }
        // Apply location filter
        if (filters.location !== "all") {
            result = result.filter(event => event.city === filters.location);
        }
        // Apply date range filter
        if (filters.dateRange !== "all") {
            const today = new Date();
            const oneWeekLater = new Date();
            oneWeekLater.setDate(today.getDate() + 7);
            const oneMonthLater = new Date();
            oneMonthLater.setMonth(today.getMonth() + 1);
            switch (filters.dateRange) {
                case "today":
                    result = result.filter(event => {
                        const eventDate = new Date(event.startDate);
                        return eventDate.toDateString() === today.toDateString();
                    });
                    break;
                case "this-week":
                    result = result.filter(event => {
                        const eventDate = new Date(event.startDate);
                        return eventDate >= today && eventDate <= oneWeekLater;
                    });
                    break;
                case "this-month":
                    result = result.filter(event => {
                        const eventDate = new Date(event.startDate);
                        return eventDate >= today && eventDate <= oneMonthLater;
                    });
                    break;
            }
        }
        // Apply sorting
        switch (filters.sortBy) {
            case "date-asc":
                result.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
                break;
            case "date-desc":
                result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
                break;
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
        }
        setFilteredEvents(result);
    }, [events, filters, searchQuery]);
    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };
    // Format date for display
    const formatEventDate = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (startDate === endDate) {
            return format(start, "MMM d, yyyy");
        }
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return `${format(start, "MMM d")} - ${format(end, "d, yyyy")}`;
        }
        return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 mt-6", children: [_jsxs("div", { className: "relative bg-orange-600 text-white", children: [_jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-30", style: { backgroundImage: "url('/api/placeholder/1200/400')" } }), _jsxs("div", { className: "relative container mx-auto px-4 py-16 text-center", children: [_jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: "Discover Sacred Experiences" }), _jsx("p", { className: "text-xl opacity-90 max-w-2xl mx-auto", children: "Find and join aartis, pujas, darshans, and spiritual gatherings across India's most sacred places" }), _jsx("div", { className: "mt-8 max-w-2xl mx-auto", children: _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search for pujas, aartis, darshans...", className: "w-full px-5 py-4 rounded-full bg-white text-black focus:ring-2 focus:ring-yellow-400 border-none shadow-lg" }), _jsx("button", { className: "absolute right-3 top-3 bg-white hover:bg-yellow-400 text-black p-2 rounded-full", children: _jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }) })] }) })] })] }), _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "hidden md:flex items-center justify-between bg-orange-600 rounded-xl p-4 shadow-md mb-8", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-sm text-white mb-1", children: "Event Type" }), _jsx("select", { value: filters.tag, onChange: (e) => handleFilterChange("tag", e.target.value), className: "p-2 border rounded-lg focus:ring focus:ring-yellow-400 bg-white text-black", children: eventTags.map(tag => (_jsx("option", { value: tag, children: tag === "all" ? "All Types" : tag.charAt(0).toUpperCase() + tag.slice(1) }, tag))) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-sm text-white mb-1", children: "Sacred Location" }), _jsx("select", { value: filters.location, onChange: (e) => handleFilterChange("location", e.target.value), className: "p-2 border rounded-lg focus:ring focus:ring-yellow-400 bg-white text-black", children: locations.map(location => (_jsx("option", { value: location, children: location === "all" ? "All Locations" : location }, location))) })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-sm text-white mb-1", children: "Date" }), _jsxs("select", { value: filters.dateRange, onChange: (e) => handleFilterChange("dateRange", e.target.value), className: "p-2 border rounded-lg focus:ring focus:ring-yellow-400 bg-white text-black", children: [_jsx("option", { value: "all", children: "Any Time" }), _jsx("option", { value: "today", children: "Today" }), _jsx("option", { value: "this-week", children: "This Week" }), _jsx("option", { value: "this-month", children: "This Month" })] })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-sm text-white mb-1", children: "Sort By" }), _jsxs("select", { value: filters.sortBy, onChange: (e) => handleFilterChange("sortBy", e.target.value), className: "p-2 border rounded-lg focus:ring focus:ring-yellow-400 bg-white text-black", children: [_jsx("option", { value: "date-asc", children: "Date: Earliest First" }), _jsx("option", { value: "date-desc", children: "Date: Latest First" }), _jsx("option", { value: "price-asc", children: "Donation: Low to High" }), _jsx("option", { value: "price-desc", children: "Donation: High to Low" }), _jsx("option", { value: "name-asc", children: "Name: A to Z" }), _jsx("option", { value: "name-desc", children: "Name: Z to A" })] })] })] }), _jsx("div", { className: "md:hidden mb-4", children: _jsxs("button", { className: "w-full bg-white p-3 rounded-lg shadow flex items-center justify-center space-x-2", onClick: () => setShowFilters(!showFilters), children: [_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }) }), _jsx("span", { children: "Filters & Sort" }), _jsx("span", { className: "ml-1", children: showFilters ? (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 15l7-7 7 7" }) })) : (_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M19 9l-7 7-7-7" }) })) })] }) }), showFilters && (_jsxs("div", { className: "md:hidden bg-white rounded-xl p-4 shadow-md mb-4 grid grid-cols-1 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-600 mb-1 block", children: "Event Type" }), _jsx("select", { value: filters.tag, onChange: (e) => handleFilterChange("tag", e.target.value), className: "w-full p-2 border rounded-lg focus:ring focus:ring-orange-300", children: eventTags.map(tag => (_jsx("option", { value: tag, children: tag === "all" ? "All Types" : tag.charAt(0).toUpperCase() + tag.slice(1) }, tag))) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-600 mb-1 block", children: "Sacred Location" }), _jsx("select", { value: filters.location, onChange: (e) => handleFilterChange("location", e.target.value), className: "w-full p-2 border rounded-lg focus:ring focus:ring-orange-300", children: locations.map(location => (_jsx("option", { value: location, children: location === "all" ? "All Locations" : location }, location))) })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-600 mb-1 block", children: "Date" }), _jsxs("select", { value: filters.dateRange, onChange: (e) => handleFilterChange("dateRange", e.target.value), className: "w-full p-2 border rounded-lg focus:ring focus:ring-orange-300", children: [_jsx("option", { value: "all", children: "Any Time" }), _jsx("option", { value: "today", children: "Today" }), _jsx("option", { value: "this-week", children: "This Week" }), _jsx("option", { value: "this-month", children: "This Month" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "text-sm text-gray-600 mb-1 block", children: "Sort By" }), _jsxs("select", { value: filters.sortBy, onChange: (e) => handleFilterChange("sortBy", e.target.value), className: "w-full p-2 border rounded-lg focus:ring focus:ring-orange-300", children: [_jsx("option", { value: "date-asc", children: "Date: Earliest First" }), _jsx("option", { value: "date-desc", children: "Date: Latest First" }), _jsx("option", { value: "price-asc", children: "Donation: Low to High" }), _jsx("option", { value: "price-desc", children: "Donation: High to Low" }), _jsx("option", { value: "name-asc", children: "Name: A to Z" }), _jsx("option", { value: "name-desc", children: "Name: Z to A" })] })] })] })), _jsxs("div", { className: "mb-6 flex justify-between items-center", children: [_jsxs("p", { className: "text-gray-700", children: [filteredEvents.length, " ", filteredEvents.length === 1 ? "sacred event" : "sacred events", " found"] }), _jsxs("a", { href: "/event-upload", className: "bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2", children: [_jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M12 4v16m8-8H4" }) }), "Create Event"] })] }), loading ? (_jsx("div", { className: "flex justify-center items-center my-20", children: _jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500" }) })) : error ? (_jsx("div", { className: "bg-red-100 text-red-700 p-4 rounded-lg text-center my-10", children: error })) : filteredEvents.length === 0 ? (_jsxs("div", { className: "bg-amber-50 p-8 rounded-xl text-center my-10", children: [_jsx("svg", { className: "w-16 h-16 text-amber-400 mx-auto mb-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("h3", { className: "text-xl font-medium text-amber-800 mb-2", children: "No sacred events found" }), _jsx("p", { className: "text-amber-700", children: "Try changing your search or filter criteria" })] })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: filteredEvents.map(event => (_jsxs("div", { className: "bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-amber-100", children: [_jsxs("div", { className: "relative h-48", children: [_jsx("img", { src: event.image, alt: event.name, className: "w-full h-full object-cover" }), _jsx("span", { className: "absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full", children: event.tag })] }), _jsxs("div", { className: "p-5", children: [_jsxs("div", { className: "flex items-center text-gray-500 text-sm mb-2", children: [_jsx("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }), formatEventDate(event.startDate, event.endDate)] }), _jsx("h3", { className: "text-xl font-bold text-amber-800 mb-2", children: event.name }), _jsx("p", { className: "text-gray-600 text-sm mb-4 line-clamp-2", children: event.description }), _jsxs("div", { className: "flex justify-between items-center text-sm", children: [_jsxs("div", { className: "flex items-center text-gray-500", children: [_jsxs("svg", { className: "w-4 h-4 mr-1", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })] }), event.city] }), _jsx("div", { className: "font-bold text-orange-700", children: event.price === 0 ? "Free" : `₹${event.price}` })] })] }), _jsx("div", { className: "px-5 pb-5", children: _jsx("button", { className: "w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2 rounded-lg font-medium transition duration-300", children: "View Darshan Details" }) })] }, event.id))) }))] })] }));
}
