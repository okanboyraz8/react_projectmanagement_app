import './Sidebar.css'

import {NavLink} from 'react-router-dom'

import Avatar from './Avatar'

//user bilgisine ihtiyaç var, sebep: user isim bilgisi ve foto bilgisi için:
import { useAuthContext } from '../hooks/useAuthContext'


export default function Sidebar() {

  const {user} =useAuthContext();

  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
        <Avatar src={user?.photoURL} />
        <p>Hello {user?.displayName}</p>
        </div>
        <nav className='links'>  
          <ul>
            <li>
              <NavLink to="/">
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <span>New Project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>  
  )
}