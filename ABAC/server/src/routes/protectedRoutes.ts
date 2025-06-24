import express from "express";
import { checkAttribute } from "../middleware/abacMiddleware";
import { verifyToken } from "../middleware/authMiddleware"; // koristi verifyToken

const router = express.Router();

// Prvo JWT provera, onda ABAC check
// Admin ruta
router.get(
  "/admin-only",
  verifyToken, // autentikacija (JWT)
  checkAttribute({ attribute: "role", value: "admin" }), // autorizacija (ABAC)
  (req, res) => {
    res.json({ message: "Welcome, admin!" });
  }
);
//  User ruta
router.get(
  "/user-only",
  verifyToken,
  checkAttribute({ attribute: "role", value: "user" }),
  (req, res) => {
    res.json({ message: "Welcome, user!" });
  }
);

//  Moderator ruta
router.get(
  "/moderator-only",
  verifyToken,
  checkAttribute({ attribute: "role", value: "moderator" }),
  (req, res) => {
    res.json({ message: "Welcome, moderator!" });
  }
);

export default router;
