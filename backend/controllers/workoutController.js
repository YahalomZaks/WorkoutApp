import WorkoutModel from "../models/workoutModel.js";
import mongoose from "mongoose";

const getWorkouts = async (req, res) => {
  const user_id = req.user?._id;
  const workouts = await WorkoutModel.find({ user_id }).sort({ createdAt: -1 });
  return res.status(200).json(workouts);
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

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await WorkoutModel.create({ title, reps, load, user_id });
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
