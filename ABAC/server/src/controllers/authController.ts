import { addUser, findUserByUsername } from "../models/userModel";
import { Request, Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = (req: Request, res: Response): void => {
  const { username, password, attributes } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required." });
    return;
  }

  const existing = findUserByUsername(username);
  if (existing) {
    res.status(409).json({ message: "User already exists." });
    return;
  }

  addUser({ username, password, attributes: attributes || {} });
  res.status(201).json({ message: "User registered." });
};

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid credentials." });
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET not defined.");
  }

  const payload = {
    username: user.username,
    attributes: user.attributes,
  };

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN ||
      "1d") as unknown as SignOptions["expiresIn"],
  };

  const token = jwt.sign(payload, secret, options);

  res.status(200).json({ message: "Login successful", token });
};
