import request from "supertest";
import app from "../src/app";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

describe("verifyToken middleware", () => {
  const validUser = {
    username: "validuser",
    password: "validpass",
    attributes: { role: "user" },
  };

  let token: string;

  beforeAll(async () => {
    await request(app).post("/auth/register").send(validUser);
    const res = await request(app).post("/auth/login").send({
      username: validUser.username,
      password: validUser.password,
    });
    token = res.body.token;
  });

  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/protected/user-only");
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided.");
  });

  it("should return 403 if token is invalid", async () => {
    const res = await request(app)
      .get("/protected/user-only")
      .set("Authorization", `Bearer invalidtoken`);
    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Invalid or expired token.");
  });

  it("should proceed to route handler if token is valid", async () => {
    const res = await request(app)
      .get("/protected/user-only")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Welcome, user!");
  });
});
