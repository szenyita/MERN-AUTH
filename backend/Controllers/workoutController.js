const mongoose = require("mongoose")
const Workout = require("../Models/workoutModel")

const getWorkouts = async (req, res) => {
    const user_id = req.headers._id
    try {
        const workouts = await Workout.find({user_id})
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createWorkout = async (req, res) => {
    const user_id = req.headers._id
    const {title, load, reps} = req.body
    const emptyFields = []

    if (!title) {
        emptyFields.push("title")
    }
    if (!load) {
        emptyFields.push("load")
    }
    if (!reps) {
        emptyFields.push("reps")
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "All fields must be filled", emptyFields})
    }

    try {
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "no such workout"})
    }

    const workout = await Workout.findByIdAndDelete(id)
    if (!workout) {
        return res.status(400).json({error: "no such workout"})
    }
    res.status(200).json(workout)
}

module.exports = {
    getWorkouts,
    createWorkout,
    deleteWorkout
}