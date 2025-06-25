import request from "supertest";
import app from "../src/app";

const adminUser = {
  username: "admin_user",
  password: "adminpass",
  attributes: { role: "admin" },
};

const regularUser = {
  username: "regular_user",
  password: "userpass",
  attributes: { role: "user" },
};

let adminToken: string;
let userToken: string;

beforeAll(async () => {
  await request(app).post("/auth/register").send(adminUser);
  await request(app).post("/auth/register").send(regularUser);

  const adminLogin = await request(app).post("/auth/login").send({
    username: adminUser.username,
    password: adminUser.password,
  });
  adminToken = adminLogin.body.token;

  const userLogin = await request(app).post("/auth/login").send({
    username: regularUser.username,
    password: regularUser.password,
  });
  userToken = userLogin.body.token;
});

afterAll((done) => {
  // Zatvori server ako koristiš app.listen u index.ts
  const server = app.listen();
  server.close(done);
});

describe("Protected Routes", () => {
  it("should allow admin to access /admin-only", async () => {
    const res = await request(app)
      .get("/protected/admin-only")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Welcome, admin!");
  });

  it("should forbid user with no admin role", async () => {
    const res = await request(app)
      .get("/protected/admin-only")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });

  it("should reject request without token", async () => {
    const res = await request(app).get("/protected/admin-only");
    expect(res.status).toBe(401);
  });
});
