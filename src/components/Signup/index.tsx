import React, { useState } from 'react'
import './index.scss'

interface SignupProps {
  children?: React.ReactNode
}

const Signup: React.FC<SignupProps> = () => {
  const [username, setUsername] = useState('')
  return (
    <form className="signup">
      <h2>Welcome to CodeLeap network!</h2>

      <div className="form-group">
        <label htmlFor="username">Please enter your username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="John doe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <button type="submit" disabled={username.length === 0}>
        ENTER
      </button>
    </form>
  )
}

export default Signup
