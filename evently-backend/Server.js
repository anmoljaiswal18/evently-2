// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// User Schema
const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Event Schema (added for the new API route)
const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  location: String,
  date: String,
  price: Number,
  organizer: String,
  bannerImage: String, // base64 or URL of image
});
const Event = mongoose.model("Event", eventSchema);

// Register Route (this remains as is)
app.post("/api/auth/register", async (req, res) => {
  const { userId, name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = new User({ userId, name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Upload Event Route (added new route for uploading events)
app.post("/api/uploadEvent", async (req, res) => {
  const {
    name,
    description,
    category,
    location,
    date,
    price,
    organizer,
    bannerImage,
  } = req.body;

  try {
    if (!name || !description || !category || !location || !date || !organizer || !bannerImage) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newEvent = new Event({
      name,
      description,
      category,
      location,
      date,
      price,
      organizer,
      bannerImage,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event uploaded successfully" });
  } catch (err) {
    console.error("❌ Error uploading event:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
