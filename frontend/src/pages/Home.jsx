import React from 'react'
import {Link} from 'react-router-dom'
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa'

export const Home = () => {
  return (
    <React.Fragment>
      <section className='heading'>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>

      <Link className='btn btn-reverse btn-block' to='/new-ticket'>
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link className='btn btn-block' to='/tickets'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </React.Fragment>
  )
}