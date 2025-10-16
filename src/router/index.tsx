import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom'
import MainScreen from '../components/MainScreen'
import Signup from '../components/Signup'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<MainScreen />} />
        <Route path="/login" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
