const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/contactFormDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);

// API Endpoint to handle form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send("All fields are required");
  }

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).send("Message saved successfully");
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).send("Failed to save message");
  }
});
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${3000}`);
});
