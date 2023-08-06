import './Navbar.css'

import { Link } from 'react-router-dom'

import TIcon from '../assets/t.jpg'
import HIcon from '../assets/h.jpg'
import EIcon from '../assets/e.jpg'

//Çıkış işlemini gerçekleştirmek amacıyla:
import { useLogout } from '../hooks/useLogout'

//Kullanıcı bilgisine erişmek için:
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {

    const { logout, isPending } = useLogout();

    const { user } = useAuthContext();

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={TIcon} alt="AOS Proje Yönetim" />
                    <img src={HIcon} alt="AOS Proje Yönetim" />
                    <img src={EIcon} alt="AOS Proje Yönetim" />
                    <span>Project Management</span>
                </li>
                {
                    !user && (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup">Signup</Link>
                            </li>
                        </>
                    )
                }
                {
                    user && (
                        <li>
                            {!isPending && <button className='logout-btn' onClick={logout}>Logout</button>}
                            {isPending && <button disabled className='logout-btn'>Exiting...</button>}
                        </li>
                    )
                }
            </ul>
        </div>
    )
}