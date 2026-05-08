const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, updateStatus } = require('../controllers/bookingController');

router.post('/bookings', createBooking);
router.get('/bookings', getMyBookings);
router.patch('/bookings/:id/status', updateStatus);

module.exports = router;