import React from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const {user} = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>

      <ul>
        {
          user 
          ? (
            <li>
              <button className='btn' onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) 
          : (
            <React.Fragment>
              {location.pathname !== '/login' && (
                <li>
                  <Link to='/login'>
                    <FaSignInAlt /> Login
                  </Link>
                </li>
              )}
              {location.pathname !== '/register' && (
                <li>
                  <Link to='/register'>
                    <FaUser /> Register
                  </Link>
                </li>
              )}
            </React.Fragment>
          )
        }
      </ul>
    </header>
  )
}