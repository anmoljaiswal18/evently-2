"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";

interface EventData {
  id: string;
  name: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  tag: string;
  image: string;
}

interface FilterOptions {
  tag: string;
  location: string;
  dateRange: string;
  sortBy: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions>({
    tag: "all",
    location: "all",
    dateRange: "all",
    sortBy: "date-asc",
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const eventTags = [
    "all", "music", "holi", "diwali", "birthday",
    "aarti", "darshan", "festival", "concert",
    "conference", "workshop", "sports", "cultural"
  ];

  const locations = [
    "all", "Mumbai", "Delhi", "Bangalore", "Chennai",
    "Kolkata", "Hyderabad", "Pune", "Ahmedabad"
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        const mappedEvents: EventData[] = data.map((event: any) => ({
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
        setEvents(mappedEvents);
        setFilteredEvents(mappedEvents);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let result = [...events];
    if (searchQuery) {
      result = result.filter(event =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.tag !== "all") {
      result = result.filter(event => event.tag === filters.tag);
    }
    if (filters.location !== "all") {
      result = result.filter(event => event.city === filters.location);
    }
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

  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (startDate === endDate) return format(start, "MMM d, yyyy");
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${format(start, "MMM d")} - ${format(end, "d, yyyy")}`;
    }
    return `${format(start, "MMM d, yyyy")} - ${format(end, "MMM d, yyyy")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 mt-6">
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/api/placeholder/1200/400')" }}
        ></div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Find and join cultural events, celebrations, workshops and more happening around you
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by name or description..."
                className="w-full px-5 py-4 rounded-full bg-white text-black focus:ring-2 focus:ring-yellow-400 border-none shadow-lg"
              />
              <button className="absolute right-3 top-3 bg-white hover:bg-yellow-400 text-black p-2 rounded-full">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters Section - Desktop */}
        <div className="hidden md:flex items-center justify-between bg-blue-600 rounded-xl p-4 shadow-md mb-8">
          {/* Tag Filter */}
          <div className="flex flex-col">
            <label className="text-sm text-black mb-1">Event Type</label>
            <select
              value={filters.tag}
              onChange={(e) => handleFilterChange("tag", e.target.value)}
              className="p-2 border rounded-lg focus:ring focus:ring-yellow-400 bg-blue-400"
            >
              {eventTags.map(tag => (
                <option key={tag} value={tag}>
                  {tag === "all" ? "All Types" : tag.charAt(0).toUpperCase() + tag.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Location Filter */}
          <div className="flex flex-col">
            <label className="text-sm text-black mb-1">Location</label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="p-2 border rounded-lg focus:ring focus:ring-blue-300 bg-blue-400"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === "all" ? "All Locations" : location}
                </option>
              ))}
            </select>
          </div>
          
          {/* Date Range Filter */}
          <div className="flex flex-col">
            <label className="text-sm text-black mb-1">Date</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="p-2 border rounded-lg focus:ring focus:ring-blue-300 bg-blue-400"
            >
              <option value="all">Any Time</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
          
          {/* Sort Filter */}
          <div className="flex flex-col">
            <label className="text-sm text-black mb-1">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="p-2 border rounded-lg focus:ring focus:ring-blue-300 bg-blue-400"
            >
              <option value="date-asc">Date: Earliest First</option>
              <option value="date-desc">Date: Latest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        
        {/* Filters Button - Mobile */}
        <div className="md:hidden mb-4">
          <button 
            className="w-full bg-white p-3 rounded-lg shadow flex items-center justify-center space-x-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Filters & Sort</span>
            <span className="ml-1">
              {showFilters ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
        </div>
        
        {/* Mobile Filters (Expandable) */}
        {showFilters && (
          <div className="md:hidden bg-white rounded-xl p-4 shadow-md mb-4 grid grid-cols-1 gap-4">
            {/* Tag Filter */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Event Type</label>
              <select
                value={filters.tag}
                onChange={(e) => handleFilterChange("tag", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                {eventTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag === "all" ? "All Types" : tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Location Filter */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date Range Filter */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Date</label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="all">Any Time</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
              </select>
            </div>
            
            {/* Sort Filter */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="date-asc">Date: Earliest First</option>
                <option value="date-desc">Date: Latest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-700">
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
          </p>
          
          {/* Add a create event button that links to the event upload page */}
          <a 
            href="/event-upload" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </a>
        </div>
        
        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center my-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center my-10">
            {error}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-gray-100 p-8 rounded-xl text-center my-10">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No events found</h3>
            <p className="text-gray-500">Try changing your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Event Image */}
                <div className="relative h-48">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover"
                  />
                  {/* Tag Badge */}
                  <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {event.tag}
                  </span>
                </div>
                
                {/* Event Content */}
                <div className="p-5">
                  {/* Date */}
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatEventDate(event.startDate, event.endDate)}
                  </div>
                  
                  {/* Event Name */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                  
                  {/* Event Description - Truncated */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  {/* Price and Location */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.city}
                    </div>
                    <div className="font-bold text-blue-700">
                      {event.price === 0 ? "Free" : `₹${event.price}`}
                    </div>
                  </div>
                </div>
                
                {/* View Details Button */}
                <div className="px-5 pb-5">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 rounded-lg font-medium transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}