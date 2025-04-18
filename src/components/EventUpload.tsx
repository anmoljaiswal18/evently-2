"use client";
import { useState } from "react";

interface EventData {
  name: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  image: string; // 🔄 now it's a base64 string
  city: string;
  state: string;
  interest: string;
}

export default function EventUpload() {
  const [formData, setFormData] = useState<Omit<EventData, "image">>({
    name: "",
    description: "",
    price: 0,
    startDate: "",
    endDate: "",
    city: "",
    state: "",
    interest: "",
  });

  const [imageBase64, setImageBase64] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend: EventData = {
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
      } else {
        alert("❌ Upload failed: " + result.error);
      }
    } catch (error) {
      console.error("Error uploading event:", error);
      alert("❌ Error uploading event.");
    }
  };

  return (
    <div className="relative overflow-hidden w-full h-screen flex justify-center items-center">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-sm"
      >
        <source src="/images/invideo.mp4" type="video/mp4" />
      </video>

      <form 
        onSubmit={handleSubmit} 
        className="bg-blue-400 p-6 shadow-lg rounded-lg w-full max-w-lg z-10 mt-2 mb-2"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Upload Your Event
        </h2>

        {/* Event Name */}
        <div className="mb-4">
          <label className="block text-black">Event Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter event name"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700">Event Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter event description"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Enter event price"
            required
          />
        </div>

        {/* Start & End Date in Same Line */}
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>
        </div>

        {/* State & City in Same Line */}
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter state"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter city"
              required
            />
          </div>
        </div>

        {/* Interest/Category */}
        <div className="mb-4">
          <label className="block text-gray-700">Interest/Category</label>
          <input
            type="text"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="E.g. Music, Tech, Sports"
            required
          />
        </div>

        {/* File Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Event Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Upload Event
        </button>
      </form>
    </div>
  );
}