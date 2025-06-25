import express from "express";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

export default app;
