import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'

import MainScreen from '../components/MainScreen'
import Signup from '../components/Signup'
import { useState } from 'react'

const AppRouter = () => {
  const [username, setUsername] = useState<string | null>(() => {
    const savedUsername = localStorage.getItem('username')
    return savedUsername || null
  })

  const handleLogout = () => {
    localStorage.removeItem('username')
    setUsername(null)
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={username ? '/home' : '/login '} />}
        />
        <Route
          path="/login"
          element={
            !username ? (
              <Signup setUsername={setUsername} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={
            username ? (
              <MainScreen currentUser={username} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRouter
