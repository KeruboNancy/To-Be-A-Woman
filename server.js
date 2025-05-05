const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "femininity_platform"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

// API Routes

// Save Vote
app.post("/api/votes", (req, res) => {
  const { vote_type } = req.body;

  const sql = "INSERT INTO votes (vote_type) VALUES (?)";
  db.query(sql, [vote_type], (err) => {
    if (err) return res.status(500).send("Error saving vote.");
    res.send("Vote saved.");
  });
});

// Save Testimonial
app.post("/api/testimonials", (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Testimonial text is required." });
  }

  const sql = "INSERT INTO testimonials (text) VALUES (?)";
  db.query(sql, [text.trim()], (err) => {
    if (err) {
      console.error("Error saving testimonial:", err);
      return res.status(500).json({ error: "Could not save testimonial." });
    }
    res.status(201).json({ message: "Testimonial saved successfully!" });
  });
});

// Get All Testimonials
app.get("/api/testimonials", (req, res) => {
  const sql = "SELECT * FROM testimonials ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching testimonials:", err);
      return res.status(500).json({ error: "Could not load testimonials." });
    }
    res.json(results);
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});