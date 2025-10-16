import React from 'react'
import './index.scss'

interface SignupProps {
  children?: React.ReactNode
}

const Signup: React.FC<SignupProps> = () => {
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
        />
      </div>

      <button type="submit">ENTER</button>
    </form>
  )
}

export default Signup
