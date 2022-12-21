import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket, reset} from '../features/tickets/ticketSlice'
import {Spinner, BackButton} from '../components'

export const NewTicket = () => {
  const [ticketData, setTicketData] = React.useState({
    product: 'iPhone',
    description: ''
  })
  const {user} = useSelector((state) => state.auth)
  const {
    isLoading,
    isError, 
    isSuccess, 
    message
  } = useSelector((state) => state.tickets)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, navigate, isError, isSuccess, message])

  const handleSubmit = (e) => {
    e.preventDefault()

    const {product, description} = ticketData
    dispatch(createTicket({product, description}))
  }

  const handleChange = (e) => {
    const {id, value} = e.target
    setTicketData(prevTicketData => {
      return {
        ...prevTicketData,
        [id]: value
      }
    })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <React.Fragment>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label>Customer Name</label>
          <input 
            className='form-control' 
            type='text' 
            value={user.name}
            disabled
          />
        </div>

        <div className='form-group'>
          <label>Customer Email</label>
          <input 
            className='form-control' 
            type='text' 
            value={user.email}
            disabled
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select 
              id='product' 
              name='product' 
              value={ticketData.product} 
              onChange={handleChange}
            > 
              <option value='iPhone'>iPhone</option>
              <option value='iPad'>iPad</option>
              <option value='MacBook Pro'>MacBook Pro</option>
              <option value='iMac'>iMac</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea 
              id='description' 
              name='description' 
              className='form-control' 
              placeholder='Description'
              value={ticketData.description}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </React.Fragment>
  )
}