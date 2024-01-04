import express from "express";
import {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";

export const workoutsRoutes = express.Router();

workoutsRoutes.get("/", getWorkouts);

workoutsRoutes.get("/:id", getSingleWorkout);

workoutsRoutes.post("/", createWorkout);

workoutsRoutes.delete("/:id", deleteWorkout);

workoutsRoutes.patch("/:id", updateWorkout);
