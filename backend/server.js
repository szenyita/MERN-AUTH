require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRoute = require("./Routes/userRoute")
const workoutRoute = require("./Routes/workoutRoute")

const app = express()

const startServer = async () => {
    try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(process.env.PORT)
    console.log("connected to db and started listening for requests on port", process.env.PORT)
    } catch (error) {
        console.log(error)
    }
}
startServer()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api/user", userRoute)
app.use("/api/workouts", workoutRoute)