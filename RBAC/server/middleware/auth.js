const jwt = require("jsonwebtoken");

const roles = {
  admin: ["admin", "user", "guest"],
  user: ["user", "guest"],
  guest: ["guest"],
};

const auth = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      const allowedRoles = roles[decoded.role] || [];
      if (!allowedRoles.includes(requiredRole)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};

module.exports = auth;
