import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not defined in .env");
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded as any; // Cast ako koristiš custom payload
    next(); // ✅ ništa se ne vraća, samo poziv next
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
    return;
  }
};
