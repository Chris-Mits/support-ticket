import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import {Spinner} from '../components'
import {FaUser, FaEye, FaEyeSlash} from 'react-icons/fa'

export const Register = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [passVisible, setPassVisible] = React.useState(false)
  const [pass2Visible, setPass2Visible] = React.useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
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
    const {password, password2} = formData

    if (password !== password2) {
      toast.error('Passwords do not match')
      return
    } else {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <React.Fragment>
      <section className='heading'>
        <h1><FaUser /> Register</h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input 
              id='name'
              className='form-control'
              type='text' 
              placeholder='Enter your name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className='form-group icon'>
            <input 
              id='password2'
              className='form-control'
              type={pass2Visible ? 'text' : 'password'}  
              placeholder='Confirm password'
              value={formData.password2}
              onChange={handleChange}
              required
            />
            {
              formData.password2 !== '' 
              ? (pass2Visible 
                ? <FaEyeSlash onClick={() => setPass2Visible(!pass2Visible)} /> 
                : <FaEye onClick={() => setPass2Visible(!pass2Visible)} />
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