const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// Multer setup for storing images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// User Schema
const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Event Schema
const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  location: String,
  date: String,
  price: Number,
  organizer: String,
  bannerImage: String, // image file path
});
const Event = mongoose.model("Event", eventSchema);

// Register Route
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

// Event Upload Route with Multer
app.post("/api/event-upload", upload.single("bannerImage"), async (req, res) => {
  const { name, description, category, location, date, price, organizer } = req.body;
  const bannerImage = req.file?.path;

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

// GET /api/events - Fetch all events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});



// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
