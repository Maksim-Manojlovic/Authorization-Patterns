const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Fake in-memory user database
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
  { username: "guest", password: "guest123", role: "guest" },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if user exists in DB
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT with role from DB
  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
