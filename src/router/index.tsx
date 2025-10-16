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
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Signup setUsername={setUsername} />} />
        <Route
          path="/home"
          element={<MainScreen currentUser={username || ''} />}
        />
      </Routes>
    </Router>
  )
}

export default AppRouter
