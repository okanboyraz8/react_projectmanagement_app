import './Login.css'

import React, { useState } from 'react'

import { useLogin } from '../../hooks/useLogin'

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { error, isPending, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.log(email, password)
    login(email, password);
  }

  return (
    <div>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <label>
          <span>Email:</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {!isPending && <button className="btn">Login</button>}
        {isPending && <button className="loading-btn" disabled>Loading...</button>}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}
