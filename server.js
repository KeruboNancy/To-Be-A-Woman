const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.text()); 


const db = mysql.createConnection({
  host: "localhost",       
  user: "root",            
  password: "",          
  database: "femininity_platform"
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL database.");
});
 

function parseBody(body) {
  const data = {};
  if (!body) return data;
  const pairs = body.split("&");
  for (let pair of pairs) {
    const [key, value] = pair.split("=");
    data[key] = decodeURIComponent(value.replace(/\+/g, " "));
  }
  return data;
}


app.post("/api/votes", (req, res) => {
  let body = "";
  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => {
    const data = parseBody(body);
    const { vote_type } = data;

    if (!["inspired", "neutral", "not_inspired"].includes(vote_type)) {
      return res.status(400).send("Invalid vote_type.");
    }

    const sql = "INSERT INTO votes (vote_type) VALUES (?)";
    db.query(sql, [vote_type], (err) => {
      if (err) return res.status(500).send("Error saving vote.");
      res.status(201).send("Vote saved.");
    });
  });
});


app.get("/api/votes", (req, res) => {
  const sql = "SELECT * FROM votes ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error fetching votes.");
    let output = "Votes:\n";
    results.forEach(vote => {
      output += `${vote.vote_id}: ${vote.vote_type} (${vote.created_at})\n`;
    });
    res.send(output);
  });
});

app.post("/api/testimonials", (req, res) => {
  let body = "";
  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => {
    const data = parseBody(body);
    const { user_id, message } = data;

    if (!user_id || !message || message.trim() === "") {
      return res.status(400).send("user_id and message are required.");
    }

    const sql = "INSERT INTO testimonials (user_id, message) VALUES (?, ?)";
    db.query(sql, [user_id, message.trim()], (err) => {
      if (err) return res.status(500).send("Error saving testimonial.");
      res.status(201).send("Testimonial saved.");
    });
  });
});


app.get("/api/testimonials", (req, res) => {
  const sql = "SELECT * FROM testimonials ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error fetching testimonials.");
    let output = "Testimonials:\n";
    results.forEach(t => {
      output += `${t.testimonial_id} (User: ${t.user_id}): ${t.message} (${t.created_at})\n`;
    });
    res.send(output);
  });
});


app.put("/api/testimonials/:id", (req, res) => {
  let body = "";
  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => {
    const data = parseBody(body);
    const { message } = data;
    const { id } = req.params;

    if (!message || message.trim() === "") {
      return res.status(400).send("Message is required.");
    }

    const sql = "UPDATE testimonials SET message = ? WHERE testimonial_id = ?";
    db.query(sql, [message.trim(), id], (err, result) => {
      if (err) return res.status(500).send("Error updating testimonial.");
      if (result.affectedRows === 0) return res.status(404).send("Testimonial not found.");
      res.send("Testimonial updated.");
    });
  });
});


app.delete("/api/testimonials/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM testimonials WHERE testimonial_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send("Error deleting testimonial.");
    if (result.affectedRows === 0) return res.status(404).send("Testimonial not found.");
    res.send("Testimonial deleted.");
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});