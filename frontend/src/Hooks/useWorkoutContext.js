import {useContext} from "react"
import {WorkoutContext} from "../Context/WorkoutContext"

const useWorkoutContext = () => {
    const context = useContext(WorkoutContext)
    if (!context) {
        throw Error("useWorkoutContext hook can only be used in WorkoutContextProvider")
    }
    return context
}

export default useWorkoutContext