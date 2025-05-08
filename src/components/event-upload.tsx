"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface EventData {
  name: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  tag: string;
}

interface SubmitMessage {
  type: string;
  text: string;
}

export default function EventUpload() {
  const [formData, setFormData] = useState<EventData>({
    name: "",
    description: "",
    price: 0,
    startDate: "",
    endDate: "",
    city: "",
    state: "",
    tag: "music",
  });

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessage>({ type: "", text: "" });

  const eventTags: string[] = [
    "music", "holi", "diwali", "birthday", 
    "aarti", "darshan", "festival", "concert", 
    "conference", "workshop", "sports", "cultural"
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Math.max(0, Number(value)) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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

    } catch (error) {
      console.error("Error uploading event:", error);
      setSubmitMessage({ type: "error", text: "❌ Error uploading event." });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage({ type: "", text: "" }), 5000);
    }
  };

  return (
    <div className="relative overflow-auto w-full min-h-screen flex justify-center items-center py-8 mt-10">
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover brightness-50 blur-sm"
      >
        <source src="/images/invideo.mp4" type="video/mp4" />
      </video>

      <div className="max-w-3xl w-full z-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Your Event</h1>
          <p className="text-gray-200 mt-2">Fill in the details to share your event with others</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          <div className="h-52 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative flex items-center justify-center">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Event banner preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-blue-600">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" clipRule="evenodd" />
                  <path d="M8.5 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  <path fillRule="evenodd" d="M4 15h12l-3.5-5-2.5 3-2-2.5L4 15z" clipRule="evenodd" />
                </svg>
                <p className="font-medium">Your event banner will appear here</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {submitMessage.text && (
              <div className={`mb-4 p-3 rounded-lg text-center ${
                submitMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {submitMessage.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                  placeholder="Enter a catchy name"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                  placeholder="Describe your event"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                  placeholder="0 for free"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Event Tag</label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                  required
                >
                  {eventTags.map(tag => (
                    <option key={tag} value={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                  placeholder="Enter state"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Event Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 rounded-lg border border-black text-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? "Submitting..." : "Upload Event"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
