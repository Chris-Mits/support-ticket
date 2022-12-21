import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import {Home, Login, Register, NewTicket, Tickets, Ticket} from './pages'
import {Header, PrivateRoute} from './components'

import 'react-toastify/dist/ReactToastify.min.css'

export const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<Tickets />} />
            </Route>
            <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
              <Route path='/ticket/:ticketId' element={<Ticket />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>

      <ToastContainer 
        position='top-right'
        autoClose={3500}
        theme='dark'
      />
    </React.Fragment>
  )
}