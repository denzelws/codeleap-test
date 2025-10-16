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
  const [username, setUsername] = useState<string | null>(null)

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={<MainScreen currentUser={username || ''} />}
        />
        <Route path="/login" element={<Signup setUsername={setUsername} />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
