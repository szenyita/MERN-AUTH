import {useState} from "react"
import useAuthContext from "./useAuthContext"

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch("http://localhost:4000/api/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
        const data = await response.json()

        if (response.ok) {
            setIsLoading(false)
            setError(null)
            dispatch({type: "LOGIN", payload: data})
            localStorage.setItem("user", JSON.stringify(data))
        } else {
            setIsLoading(false)
            setError(data.error)
        }
    }
    return {isLoading, error, login}
}

export default useLogin