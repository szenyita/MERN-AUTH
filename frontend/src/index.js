import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import {AuthContextProvider} from "./Context/AuthContext"
import {WorkoutContextProvider} from "./Context/WorkoutContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
      <AuthContextProvider>
        <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)