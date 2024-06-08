import {useContext} from "react"
import {AuthContext} from "../Context/AuthContext"

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw Error("useAuthContext hook can only be used in AuthContextProvider")
    }
    return context
}

export default useAuthContext