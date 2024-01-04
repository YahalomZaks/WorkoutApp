import WorkoutModel from "../models/workoutModel.js";
import mongoose from "mongoose";

const getWorkouts = async (req, res) => {
  const workouts = await WorkoutModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "cant find workout" });
  }
  const getWorkout = await WorkoutModel.findById(id);

  if (!getWorkout) {
    return res.status(404).json({ error: "cant find workout" });
  }

  res.status(200).json(getWorkout);
};

const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await WorkoutModel.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "cant find workout" });
  }
  const deleteWorkout = await WorkoutModel.findOneAndDelete({ _id: id });

  if (!deleteWorkout) {
    return res.status(404).json({ error: "cant find workout" });
  }

  res.status(200).json(deleteWorkout);
};

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "cant find workout" });
  }
  const updateWorkout = await WorkoutModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!updateWorkout) {
    return res.status(404).json({ error: "cant find workout" });
  }

  res.status(200).json(updateWorkout);
};

export {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
