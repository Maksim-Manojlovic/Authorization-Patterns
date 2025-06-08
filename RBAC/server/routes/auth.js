const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

// Fake in-memory user database (hashed passwords)
const users = [
  {
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    username: "user",
    password: bcrypt.hashSync("user123", 10),
    role: "user",
  },
  {
    username: "guest",
    password: bcrypt.hashSync("guest123", 10),
    role: "guest",
  },
];

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Compare password with hashed version
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT
  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
