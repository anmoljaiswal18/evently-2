"use client";
import { useEffect, useState } from "react";
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

export default function ReligiousEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    date: "all",
    price: "all",
    location: "all"
  });

  const formatEventDate = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    if (start === end) return format(s, "MMM d, yyyy");
    return `${format(s, "MMM d")} - ${format(e, "MMM d, yyyy")}`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        const mapped: EventData[] = data.map((event: any) => ({
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
        const religiousEvents = mapped.filter(e =>
          religiousTags.includes(e.tag.toLowerCase())
        );
        setEvents(religiousEvents);
        setFilteredEvents(religiousEvents);
        setLoading(false);
      } catch (err) {
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
        if (filters.date === "today") return eventDate.toDateString() === today.toDateString();
        if (filters.date === "this-week") return eventDate >= today && eventDate <= weekLater;
        if (filters.date === "this-month") return eventDate >= today && eventDate <= monthLater;
        return true;
      });
    }

    if (filters.price === "free") {
      filtered = filtered.filter(e => e.price === 0);
    } else if (filters.price === "paid") {
      filtered = filtered.filter(e => e.price > 0);
    }

    if (filters.location !== "all") {
      filtered = filtered.filter(e => e.city === filters.location);
    }

    setFilteredEvents(filtered);
  }, [filters, events]);

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }));
  };

  const uniqueLocations = Array.from(new Set(events.map(e => e.city))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-green-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-orange-700">Religious Events</h1>

      {/* Filters */}
      <div className="bg-orange-400 rounded-lg shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-black ">Date</label>
          <select
            value={filters.date}
            onChange={e => handleFilterChange("date", e.target.value)}
            className="w-full p-2 border rounded mt-1 bg-orange-400"
          >
            <option value="all">Any Time</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-black">Price</label>
          <select
            value={filters.price}
            onChange={e => handleFilterChange("price", e.target.value)}
            className="w-full p-2 border rounded mt-1 bg-orange-400"
          >
            <option value="all">All</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-black">Location</label>
          <select
            value={filters.location}
            onChange={e => handleFilterChange("location", e.target.value)}
            className="w-full p-2 border rounded mt-1 bg-orange-400"
          >
            <option value="all">All</option>
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Display */}
      {loading ? (
        <div className="text-center py-20 text-orange-600">Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center py-10">{error}</div>
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No religious events found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-green-800 mb-1">{event.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{formatEventDate(event.startDate, event.endDate)}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{event.description}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{event.city}</span>
                  <span>{event.price === 0 ? "Free" : `₹${event.price}`}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
