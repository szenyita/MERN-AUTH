import {useState} from "react"
import useWorkoutContext from "../Hooks/useWorkoutContext"
import useAuthContext from "../Hooks/useAuthContext"

const WorkoutForm = () => {
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)
    const {dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    const handleSubmit = async e => {
        e.preventDefault()
        const workout = {title, load, reps}
        const response = await fetch("http://localhost:4000/api/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(workout)
        })
        const data = await response.json()

        if (response.ok) {
            setTitle("")
            setLoad("")
            setReps("")
            setEmptyFields([])
            setError(null)
            dispatch({type: "CREATE_WORKOUT", payload: data})
        } else {
            setEmptyFields(data.emptyFields)
            setError(data.error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="create">
            <label>Title:</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={emptyFields.includes("title") ? "error" : ""} />
            <label>Load:</label>
            <input type="number" value={load} onChange={e => setLoad(e.target.value)} className={emptyFields.includes("load") ? "error" : ""} />
            <label>Reps:</label>
            <input type="number" value={reps} onChange={e => setReps(e.target.value)} className={emptyFields.includes("reps") ? "error" : ""} />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
 
export default WorkoutForm