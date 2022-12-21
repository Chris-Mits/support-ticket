const express = require('express')
const router = express.Router()
const noteRouter = require('./noteRoutes')
const {protect} = require('../middleware/authMiddleware')
const {
  getTickets,
  getTicket, 
  createTicket, 
  deleteTicket, 
  updateTicket
} = require('../controllers/ticketController')

// Re-route into note router
router.use('/:ticketId/notes', noteRouter)

router
  .route('/')
  .get(protect, getTickets)
  .post(protect, createTicket)

router
  .route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket)

module.exports = router