import { Request, Response } from "express";
import { addUser, findUserByUsername } from "../models/userModel";

export const register = (req: Request, res: Response) => {
  const { username, password, attributes } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const existing = findUserByUsername(username);
  if (existing) {
    return res.status(409).json({ message: "User already exists." });
  }

  addUser({ username, password, attributes: attributes || {} });
  return res.status(201).json({ message: "User registered." });
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = findUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  return res.status(200).json({ message: "Login successful", user });
};
