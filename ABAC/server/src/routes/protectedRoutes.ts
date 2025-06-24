import express from "express";
import { checkAttribute } from "../middleware/abacMiddleware";
import { verifyToken } from "../middleware/authMiddleware"; // koristi verifyToken

const router = express.Router();

// Prvo JWT provera, onda ABAC check
router.get(
  "/admin-only",
  verifyToken, // autentikacija (JWT)
  checkAttribute({ attribute: "role", value: "admin" }), // autorizacija (ABAC)
  (req, res) => {
    res.json({ message: "Welcome, admin!" });
  }
);

export default router;
