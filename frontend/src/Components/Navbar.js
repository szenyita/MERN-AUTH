import {Link} from "react-router-dom"
import useAuthContext from "../Hooks/useAuthContext"
import useLogout from "../Hooks/useLogout"

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()

    const handleLogout = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Workouts</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="login">Login</Link>
                            <Link to="signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}
 
export default Navbar