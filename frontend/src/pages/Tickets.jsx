import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getTickets, reset} from '../features/tickets/ticketSlice'
import {Spinner, BackButton, TicketItem} from '../components'

export const Tickets = () => {
  const {tickets, isLoading, isSuccess} = useSelector((state) => state.tickets)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (!isSuccess) {
      dispatch(getTickets())
    }

    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <React.Fragment>
      <BackButton url='/' />
      <h1>Tickets</h1>

      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map(ticket => {
          return (
            <TicketItem 
              key={ticket._id} 
              ticket={ticket} 
            />
          )
        })}
      </div>
    </React.Fragment>
  )
}