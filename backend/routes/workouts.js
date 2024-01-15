import express from "express";
import {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";
import { requireAuth } from "../middleware/requireAuth.js";

export const workoutsRoutes = express.Router();

workoutsRoutes.use(requireAuth);

workoutsRoutes.get("/", getWorkouts);

workoutsRoutes.get("/:id", getSingleWorkout);

workoutsRoutes.post("/", createWorkout);

workoutsRoutes.delete("/:id", deleteWorkout);

workoutsRoutes.patch("/:id", updateWorkout);
