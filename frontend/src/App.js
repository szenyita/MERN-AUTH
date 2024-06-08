import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import Signup from "./Pages/Signup"
import Login from "./Pages/Login"
import useAuthContext from "./Hooks/useAuthContext"

const App = () => {
  const {user} = useAuthContext()

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
 
export default App