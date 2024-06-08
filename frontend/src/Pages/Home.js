import {useEffect} from "react"
import WorkoutDetails from "../Components/WorkoutDetails"
import WorkoutForm from "../Components/WorkoutForm"
import useAuthContext from "../Hooks/useAuthContext"
import useWorkoutContext from "../Hooks/useWorkoutContext"

const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:4000/api/workouts", {
                headers: {"Authorization": `Bearer ${user.token}`}
            })
            const data = await response.json()

            if (response.ok) {
                dispatch({type: "SET_WORKOUTS", payload: data})
            }
        }
        fetchData()
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workout">
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}
 
export default Home