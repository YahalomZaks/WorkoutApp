import express from "express";
import dotenv from "dotenv";
import { workoutsRoutes } from "./routes/workouts.js";
import { userRoutes } from "./routes/user.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/user", userRoutes);
app.use("/api/workouts", workoutsRoutes);
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("running on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
