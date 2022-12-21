import React from 'react'
import Modal from 'react-modal'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaEdit, FaTimesCircle} from 'react-icons/fa'
import {getTicket, closeTicket} from '../features/tickets/ticketSlice'
import {getNotes, createNote, reset as notesReset} from '../features/notes/noteSlice'
import {NoteItem, BackButton, Spinner} from '../components'

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    position: 'relative',
    width: '600px',
    top: '25%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

export const Ticket = () => {
  const [showModal, setShowModal] = React.useState(false)
  const [noteText, setNoteText] = React.useState('')
  const {
    ticket, 
    isLoading: ticketsIsLoading, 
    isError: ticketsIsError, 
    message
  } = useSelector((state) => state.tickets)
  const {
    notes, 
    isLoading: notesIsLoading
  } = useSelector((state) => state.notes)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const {ticketId} = params

  React.useEffect(() => {
    if (ticketsIsError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
  }, [dispatch, ticketsIsError, message, ticketId])

  const handleTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  const handleModal = () => {
    setShowModal(prevModalState => !prevModalState)
  }

  const handeNoteSubmit = (e) => {
    e.preventDefault()

    dispatch(createNote({noteText, ticketId}))
    setShowModal(false)
  }

  if (ticketsIsLoading || notesIsLoading) {
    return <Spinner />
  }

  if (ticketsIsError) {
    return <h3>Something went wrong</h3>
  }
  
  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('el-GR')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Issue Description</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button className='btn' onClick={handleModal}>
          <FaEdit /> Add Note
        </button>
      )}

      <Modal 
        contentLabel='Add Note' 
        style={modalStyles}
        isOpen={showModal}
        onRequestClose={handleModal} 
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={handleModal}>
          <FaTimesCircle />
        </button>

        <form onSubmit={handeNoteSubmit}>
          <div className='form-group'>
            <textarea 
              id='noteText' 
              name='noteText' 
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block' type='submit'>Submit Note</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => <NoteItem key={note._id} note={note} />)}

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={handleTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  )
}