const express = require("express")
const requireAuth = require("../MiddleWare/requireAuth")
const {
    getWorkouts,
    createWorkout,
    deleteWorkout
} = require("../Controllers/workoutController")

const router = express.Router()
router.use(requireAuth)

router.get("/", getWorkouts)
router.post("/", createWorkout)
router.delete("/:id", deleteWorkout)

module.exports = router