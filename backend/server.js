import express from "express";
import dotenv from "dotenv";
import { workoutsRoutes } from "./routes/workouts.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("running on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/api/workouts", workoutsRoutes);
