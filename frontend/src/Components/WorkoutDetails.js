import {formatDistanceToNow} from "date-fns"
import useAuthContext from "../Hooks/useAuthContext"
import useWorkoutContext from "../Hooks/useWorkoutContext"

const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    const handleDelete = async e => {
        e.preventDefault()
        const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${user.token}`}
        })
        const data = await response.json()

        if (response.ok) {
            dispatch({type: "DELETE_WORKOUT", payload: data})
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span onClick={handleDelete} className="material-symbols-outlined">Delete</span>
        </div>
    )
}
 
export default WorkoutDetails