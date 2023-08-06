import './Signup.css'

import React, { useState } from 'react'

import { useSignup } from '../../hooks/useSignup'

export default function Signup() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)

  //Seçilen dosyanın sadece resim olmasını istiyorsak:
  const [thumbnailError, setThumbnailError] = useState(null)

  const { error, isPending, signup } = useSignup();

  const handleChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    //console.log(selected)

    if (!selected) {
      setThumbnailError('Please select one image file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Please select image file')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
  }

  //Hangi alan(ların) boş geçilip geçilmediğini göstermek için:
  const handleSubmit = (e) => {
    e.preventDefault()
    if (email !== '' && password !== '' && displayName !== '' && thumbnail !== null) {
      //console.log(email, password, displayName, thumbnail);
      signup(email, password, displayName, thumbnail);
    }
  }

  return (
    <div>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Signup Page</h2>
        <label>
          <span>Email:</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          <span>Username:</span>
          <input type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label>
          <span>Profile Picture:</span>
          <input type="file" required onChange={handleChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {!isPending && <button className="btn">Üye Ol</button>}
        {isPending && <button className="loading-btn" disabled>Yükleniyor</button>}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  )
}
