// server.js
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, etc.) from current directory
app.use(express.static(__dirname));

// MariaDB Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1998",
  database: "latehar_tourism",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MariaDB database.");
});

// Form POST handler
app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Failed to insert data:", err);
      return res.status(500).send("Error saving your message.");
    }
    res.send("Message saved successfully!");
  });
});

// Optional route to serve contact.html as /contact
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
