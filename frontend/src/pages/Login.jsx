import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import {Spinner} from '../components'
import {FaSignInAlt, FaEye, FaEyeSlash} from 'react-icons/fa'

export const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })
  const [passVisible, setPassVisible] = React.useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    user, 
    isLoading, 
    isSuccess, 
    isError,
    message
  } = useSelector(state => state.auth)

  React.useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when user has logged in
    if (isSuccess && user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const handleChange = (e) => {
    setFormData(prevFormData => {
      const {id, value} = e.target

      return {
        ...prevFormData,
        [id]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email: formData.email,
      password: formData.password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <React.Fragment>
      <section className='heading'>
        <h1><FaSignInAlt /> Login</h1>
        <p>Please log in to get support</p>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input 
              id='email'
              className='form-control'
              type='email' 
              placeholder='Enter your email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group icon'>
            <input 
              id='password'
              className='form-control'
              type={passVisible ? 'text' : 'password'} 
              placeholder='Enter password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            {
              formData.password !== '' 
              ? (passVisible 
                ? <FaEyeSlash onClick={() => setPassVisible(!passVisible)} /> 
                : <FaEye onClick={() => setPassVisible(!passVisible)} />
              )
              : null
            }
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </React.Fragment>
  )
}