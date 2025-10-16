import React from 'react'
import './index.scss'

interface SignupProps {
  children?: React.ReactNode
}

const Signup: React.FC<SignupProps> = () => {
  return (
    <div className="signup">
      <h1>hellow signup</h1>
    </div>
  )
}

export default Signup
