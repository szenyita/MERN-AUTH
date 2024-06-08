import useAuthContext from "./useAuthContext"
import useWorkoutContext from "./useWorkoutContext"

const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: workoutDispatch} = useWorkoutContext()

    const logout = () => {
        dispatch({type: "LOGOUT"})
        workoutDispatch({type: "SET_WORKOUTS", payload: null})
        localStorage.removeItem("user")
    }
    return {logout}
}

export default useLogout