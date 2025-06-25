import request from "supertest";
import express from "express";
import authRoutes from "../src/routes/authRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser",
        password: "testpass",
        attributes: { role: "user" },
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered.");
  });

  it("should not register an existing user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      password: "testpass",
    });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("User already exists.");
  });

  it("should login the user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "testuser",
      password: "testpass",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should reject invalid login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: "wronguser",
      password: "wrongpass",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials.");
  });
});
