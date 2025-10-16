import React, { useState } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'

interface SignupProps {
  children?: React.ReactNode
  setUsername: (name: string) => void
}

const Signup: React.FC<SignupProps> = ({ setUsername }) => {
  const [inputValue, setInputValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.length > 0) {
      setUsername(inputValue)
      navigate('/home')
    }
  }
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Welcome to CodeLeap network!</h2>

      <div className="form-group">
        <label htmlFor="username">Please enter your username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="John doe"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <button type="submit" disabled={inputValue.length === 0}>
        ENTER
      </button>
    </form>
  )
}

export default Signup
