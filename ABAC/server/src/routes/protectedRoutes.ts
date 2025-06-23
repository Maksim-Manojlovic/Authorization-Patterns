import express from "express";
import { checkAttribute } from "../middleware/abacMiddleware";

const router = express.Router();

// Primer: dozvoljeno samo korisnicima sa role === "admin"
router.get(
  "/admin-only",
  checkAttribute({ attribute: "role", value: "admin" }),
  (req, res) => {
    res.json({ message: "Welcome, admin!" });
  }
);

export default router;
